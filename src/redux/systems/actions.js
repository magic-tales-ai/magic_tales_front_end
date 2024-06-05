import { FETCH_SYSTEM, FETCH_SYSTEM_SUCCESS, FETCH_SYSTEM_FAILED } from './constants';

export const fetchSystem = (systemId) => ({
  type: FETCH_SYSTEM,
  payload: {
    systemId
  }
})

export const fetchSystemSuccess = (systemId, data) => ({
  type: FETCH_SYSTEM_SUCCESS,
  payload: {
    systemId,
    data
  }
})

export const fetchSystemFailed = (systemId, error) => ({
  type: FETCH_SYSTEM_FAILED,
  payload: {
    systemId,
    error
  }
})