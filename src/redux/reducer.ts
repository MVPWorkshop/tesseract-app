import { combineReducers } from "redux";
import LoadingReducer from "./loading/loading.redux.reducer";
import UiReducer from "./ui/ui.redux.reducer";

const rootReducer = combineReducers({
  loading: LoadingReducer,
  ui: UiReducer
});

export default rootReducer;
