import { createStore, combineReducers, applyMiddleware } from "redux";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory, createMemoryHistory } from "history";
import { thunk } from "redux-thunk"; // ✅ Correct import for ES module compatibility
import accountReducer from "@/features/Account/store/reducers";
import campaignReducer from "@/features/Campaigns/store/reducers";
const isBrowser = typeof window !== "undefined";
const history = isBrowser ? createBrowserHistory() : createMemoryHistory();

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history,
});

export const store = createStore(
  combineReducers({
    router: routerReducer,
    account: accountReducer,
    campaign: campaignReducer
  }),
  applyMiddleware(routerMiddleware, thunk)
);

