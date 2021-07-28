export const PluginActionTypes = {
  TOGGLE_ANNOTATION_TOOLTIP_DISPLAY: 'mirador-annotation-tooltip-plugin/TOGGLE_ANNOTATION_TOOLTIP_DISPLAY',
};

export function toggleAnnotationTooltipDisplay(windowId) {
  return {
    type: PluginActionTypes.TOGGLE_ANNOTATION_TOOLTIP_DISPLAY, windowId,
  };
}
