import { combineReducers } from "redux";
import LoadingReducer from "./loading/loading.redux.reducer";
import UiReducer from "./ui/ui.redux.reducer";
import TokensReducer from "./tokens/tokens.redux.reducer";
import VaultsReducer from "./vaults/vaults.redux.reducer";

const rootReducer = combineReducers({
  loading: LoadingReducer,
  ui: UiReducer,
  tokens: TokensReducer,
  vaults: VaultsReducer
});

export default rootReducer;
