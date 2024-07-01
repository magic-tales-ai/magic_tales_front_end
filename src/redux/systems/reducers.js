import { Map } from 'immutable';
import { System } from './system';
import { FETCH_SYSTEM, FETCH_SYSTEM_SUCCESS, FETCH_SYSTEM_FAILED } from './constants';

const INIT_STATE = new Map([]);

function Systems(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SYSTEM:
      return state.merge({
        [payload.systemId]: state.get(payload.systemId) ?? new System().set('id', payload.systemId)
      });

      case FETCH_SYSTEM_SUCCESS:
        return state.updateIn([payload.systemId], system =>
          system.merge({
            items: payload.data,
            isNew: false,
            loading: false
          })
        );

        case FETCH_SYSTEM_FAILED:
          return state.updateIn([payload.systemId], system =>
            system.merge({
              loading: false,
              error: payload.error
            })
          );

    default:
      return state;
  }
}

export default Systems;