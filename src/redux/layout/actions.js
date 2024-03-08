import {
	SET_ACTIVE_TAB,
	SET_LAYOUT_MODE
} from "./constants";

export const setActiveTab = (tabId) => ({
	type: SET_ACTIVE_TAB,
	payload: tabId
});

export const changeLayoutMode = layoutMode => ({
	type: SET_LAYOUT_MODE,
	payload: layoutMode,
  });
