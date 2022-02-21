import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  getConfig, getAnnotationResourcesByMotivationForCanvas, getCurrentCanvas,
} from 'mirador/dist/es/src/state/selectors';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getAnnotationTooltips } from '../state/selectors';

class MiradorAnnotationVideoTooltip extends Component {
  constructor(props) {
    super(props);
    this.onCanvasMouseMove = this.onCanvasMouseMove.bind(this);
    this.onCanvasExit = this.onCanvasExit.bind(this);
    this.initialized = false;
    this.state = { x: 0, y: 0 };
  }

  onCanvasExit(event) {
    this.setState({ x: 0, y: 0 });
  }

  onCanvasMouseMove(event) {
    const { annotations } = this.props;
    if (annotations.length === 0) return;
    this.setState({
      x: event.nativeEvent.layerX,
      y: event.nativeEvent.layerY,
    });
  }

  render() {
    const {
      annotations, annotationTooltipEnabled, classes,
      hoveredAnnotationIds, htmlSanitizationRuleSet,
      // eslint-disable-next-line react/prop-types
      targetProps, TargetComponent,
    } = this.props;

    const { x, y } = this.state;
    const xoffset = 10;
    const yoffset = 10;
    const top = y + yoffset;
    const left = x + xoffset;
    let tooltips = '';
    if (annotationTooltipEnabled && (x > 0 && y > 0)) {
      tooltips = (
        <Typography
          component="div"
          style={{ top, left }}
          className={`${classes.annotaions} annotaion-tooltip-plugin-annotaions`}
        >
          {
            annotations.map((annotation) => {
              if (hoveredAnnotationIds && hoveredAnnotationIds.includes(annotation.id)) {
                // console.log(annotation.content);
                return (
                  <div
                    key={annotation.id}
                    className={`${classes.annotaion} annotaion-tooltip-plugin-annotaion`}
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
      );
    }
    return (
      <div onMouseMove={this.onCanvasMouseMove} onMouseLeave={this.onCanvasExit}>
        {tooltips}
        <TargetComponent
          {...targetProps} // eslint-disable-line react/jsx-props-no-spreading
        />
      </div>
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

MiradorAnnotationVideoTooltip.defaultProps = {
  annotationTooltipEnabled: true,
  annotations: [],
  htmlSanitizationRuleSet: 'iiif',
};
MiradorAnnotationVideoTooltip.propTypes = {
  annotationTooltipEnabled: PropTypes.bool,
  annotations: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.shape({
    annotaions: PropTypes.string,
    annotaion: PropTypes.string,
  }).isRequired,
  htmlSanitizationRuleSet: PropTypes.string,
  hoveredAnnotationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default {
  target: 'AnnotationsOverlayVideo',
  mode: 'wrap',
  component: withStyles(styles)(MiradorAnnotationVideoTooltip),
  mapStateToProps,
};
