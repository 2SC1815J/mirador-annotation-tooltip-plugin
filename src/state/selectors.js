import { miradorSlice } from 'mirador/dist/es/src/state/selectors';

export function getAnnotationTooltips(state, { windowId }) {
  return (miradorSlice(state).annotationTooltips || {})[windowId];
}
