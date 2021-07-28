import ActionTypes from 'mirador/dist/es/src/state/actions/action-types';
import { PluginActionTypes } from './actions';

export const annotationTooltipReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_WINDOW:
      return { ...state, [action.window.id]: { annotationTooltipEnabled: true } };
    case PluginActionTypes.TOGGLE_ANNOTATION_TOOLTIP_DISPLAY:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          annotationTooltipEnabled: !state[action.windowId].annotationTooltipEnabled,
        },
      };
    default:
      return state;
  }
};
