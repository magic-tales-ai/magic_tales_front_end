import { createSelector } from 'reselect';

import { LANGUAGES } from './constants';

export function getSystems(state) {
  return state.Systems;
}

export function getSystemById(state, systemId) {
  return getSystems(state)?.get(systemId);
}

export const selectLanguages = createSelector(
  getSystems,
  (systems) => systems.get(LANGUAGES)?.items || []
);