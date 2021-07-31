import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import { getAnnotationResourcesByMotivation } from 'mirador/dist/es/src/state/selectors';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import * as actions from '../state/actions';
import { annotationTooltipReducer } from '../state/reducers';
import { getAnnotationTooltips } from '../state/selectors';

class MiradorAnnotationSettings extends Component {
  render() {
    const {
      annotationTooltipEnabled, toggleAnnotationTooltipDisplay, annotationTooltipDisabled,
      // eslint-disable-next-line react/prop-types
      TargetComponent, targetProps,
    } = this.props;
    return (
      <div>
        <TargetComponent
          {...targetProps} // eslint-disable-line react/jsx-props-no-spreading
        />
        <MiradorMenuButton
          aria-label={annotationTooltipEnabled ? 'Hide annotation tooltip' : 'Show annotation tooltip'}
          onClick={toggleAnnotationTooltipDisplay}
          disabled={annotationTooltipDisabled}
          size="small"
        >
          { annotationTooltipEnabled ? <SpeakerNotesIcon /> : <SpeakerNotesOffIcon /> }
        </MiradorMenuButton>
      </div>
    );
  }
}

const mapStateToProps = (state, { windowId }) => ({
  annotationTooltipEnabled: getAnnotationTooltips(state, { windowId }).annotationTooltipEnabled,
  annotationTooltipDisabled: getAnnotationResourcesByMotivation(state, { windowId }).length < 1,
});

const mapDispatchToProps = (dispatch, { windowId }) => ({
  toggleAnnotationTooltipDisplay: () => {
    dispatch(actions.toggleAnnotationTooltipDisplay(windowId));
  },
});

MiradorAnnotationSettings.defaultProps = {
  annotationTooltipEnabled: true,
  annotationTooltipDisabled: true,
  toggleAnnotationTooltipDisplay: () => {},
};
MiradorAnnotationSettings.propTypes = {
  annotationTooltipEnabled: PropTypes.bool,
  annotationTooltipDisabled: PropTypes.bool,
  toggleAnnotationTooltipDisplay: PropTypes.func,
};

export default {
  target: 'AnnotationSettings',
  mode: 'wrap',
  component: MiradorAnnotationSettings,
  mapDispatchToProps,
  mapStateToProps,
  reducers: {
    annotationTooltips: annotationTooltipReducer,
  },
};
