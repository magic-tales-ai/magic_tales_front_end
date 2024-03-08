import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Chat from './chat/reducers';
import StoriesList from './stories-list/reducers';
import Websocket from './websocket/reducers';
import Layout from './layout/reducer';
import PlansList from './plans-list/reducers';
import ModalConfirm from './modal-confirm/reducers';

export default combineReducers({
    Auth,
    Chat,
    StoriesList,
    Websocket,
    Layout,
    PlansList,
    ModalConfirm
});