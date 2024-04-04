import { Map } from 'immutable';

import {
	SET_ACTIVE_TAB,
	SET_LAYOUT_MODE
} from "./constants";

const INIT_STATE = Map({
	activeTab: "chat",
	layoutMode: "dark"
});

const Layout = (state = INIT_STATE, action) => {
	switch (action.type) {
		case SET_ACTIVE_TAB:
			return state.set('activeTab', action.payload);

		case SET_LAYOUT_MODE:
			return state.set('layoutMode', action.payload);

		default:
			return state;
	}
};

export default Layout;
