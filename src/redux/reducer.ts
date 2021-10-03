import { combineReducers } from "redux";
import LoadingReducer from "./loading/loading.redux.reducer";
import UiReducer from "./ui/ui.redux.reducer";
import TokensReducer from "./tokens/tokens.redux.reducer";

const rootReducer = combineReducers({
  loading: LoadingReducer,
  ui: UiReducer,
  tokens: TokensReducer
});

export default rootReducer;
