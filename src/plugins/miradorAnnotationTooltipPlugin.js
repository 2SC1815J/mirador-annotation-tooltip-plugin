import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  getConfig, getWindow, getAnnotationResourcesByMotivationForCanvas, getCurrentCanvas,
} from 'mirador/dist/es/src/state/selectors';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import debounce from 'lodash/debounce';
import { getAnnotationTooltips } from '../state/selectors';

class MiradorAnnotationTooltip extends Component {
  constructor(props) {
    super(props);
    this.onCanvasMouseMove = debounce(this.onCanvasMouseMove.bind(this), 10);
    this.onCanvasExit = this.onCanvasExit.bind(this);
    this.initialized = false;
    this.state = { x: 0, y: 0 };
  }

  componentDidMount() {
    this.initializeViewer();
  }

  componentDidUpdate(prevProps) {
    this.initializeViewer();
  }

  componentWillUnmount() {
    const { viewer } = this.props;
    if (viewer) {
      viewer.removeHandler('canvas-exit', this.onCanvasExit);
      viewer.removeHandler('mouse-move', this.onCanvasMouseMove);
    }
  }

  onCanvasExit(event) {
    this.onCanvasMouseMove.cancel();
    this.setState({ x: 0, y: 0 });
  }

  onCanvasMouseMove(event) {
    const { annotations } = this.props;
    if (annotations.length === 0) return;
    this.setState(event.position);
  }

  initializeViewer() {
    const { viewer } = this.props;
    if (!viewer || this.initialized) return;
    this.initialized = true;
    viewer.addHandler('canvas-exit', this.onCanvasExit);
    viewer.addHandler('mouse-move', this.onCanvasMouseMove);
  }

  render() {
    const {
      annotations, annotationTooltipEnabled, classes,
      hoveredAnnotationIds, htmlSanitizationRuleSet, viewer,
    } = this.props;
    if (!annotationTooltipEnabled) return <></>;
    if (!viewer) return <></>;
    if (annotations.length === 0 || hoveredAnnotationIds.length === 0) return <></>;

    const { x, y } = this.state;
    if (!(x > 0 && y > 0)) return <></>;

    const xoffset = 10;
    const yoffset = 10;
    const top = y + yoffset;
    const left = x + xoffset;
    return ReactDOM.createPortal(
      (
        <Typography
          component="div"
          style={{ top, left }}
          className={`${classes.annotaions} annotaion-tooltip-plugin-annotaions`}
        >
          {
            annotations.map((annotation) => {
              if (hoveredAnnotationIds.includes(annotation.id)) {
                // console.log(annotation.content);
                return (
                  <div
                    className={`${classes.annotaion} annotaion-tooltip-plugin-annotaion`}
                    key={annotation.id}
                  >
                    <SanitizedHtml
                      ruleSet={htmlSanitizationRuleSet}
                      htmlString={annotation.content}
                    />
                  </div>
                );
              }
              return null;
            })
          }
        </Typography>
      ),
      viewer.canvas,
    );
  }
}

function getAnnotations(state, windowId) {
  const canvasId = (getCurrentCanvas(state, { windowId }) || {}).id;
  const annotRes = getAnnotationResourcesByMotivationForCanvas(
    state, { canvasId, windowId },
  );
  return annotRes.map((resource, i) => ({
    content: resource.chars,
    id: resource.id,
  }));
}

const mapStateToProps = (state, { windowId }) => ({
  annotationTooltipEnabled: getAnnotationTooltips(state, { windowId }).annotationTooltipEnabled,
  annotations: getAnnotations(state, windowId),
  htmlSanitizationRuleSet: getConfig(state).annotations.htmlSanitizationRuleSet,
  hoveredAnnotationIds: getWindow(state, { windowId }).hoveredAnnotationIds,
});

const styles = {
  annotaions: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.8)',
    display: 'inline-block',
    fontSize: '12px',
    zIndex: 49,
  },
  annotaion: {
    border: '1px solid #CCC',
    padding: '0 1em',
  },
};

MiradorAnnotationTooltip.defaultProps = {
  annotationTooltipEnabled: true,
  annotations: [],
  htmlSanitizationRuleSet: 'iiif',
  hoveredAnnotationIds: [],
  viewer: null,
};
MiradorAnnotationTooltip.propTypes = {
  annotationTooltipEnabled: PropTypes.bool,
  annotations: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.shape({
    annotaions: PropTypes.string,
    annotaion: PropTypes.string,
  }).isRequired,
  htmlSanitizationRuleSet: PropTypes.string,
  hoveredAnnotationIds: PropTypes.arrayOf(PropTypes.string),
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default {
  target: 'OpenSeadragonViewer',
  mode: 'add',
  component: withStyles(styles)(MiradorAnnotationTooltip),
  mapStateToProps,
};
