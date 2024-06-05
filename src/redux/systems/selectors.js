import { createSelector } from 'reselect';

export function getSystem(state) {
  return state.Systems;
}

export function getSystemById(state, systemId) {
  return getSystem(state)?.get(systemId);
}

export const selectSystems = createSelector(
    (state) => state.Systems,
    (systems) => (systems)
);