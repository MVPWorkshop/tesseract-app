import React from "react";
import AppRouter from "./router";
import { Provider } from "react-redux";
import store from "./redux/store";
import WithWeb3 from "./hocs/WithWeb3/withWeb3.hoc";
import Modals from "./components/organisms/Modals";
import WithLingui from "./hocs/WithLingui/withLingui.hoc";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <WithLingui>
        <WithWeb3 useWeb3Listener={true}>
          <AppRouter/>
          <Modals/>
        </WithWeb3>
      </WithLingui>
    </Provider>
  );
};

export default App;
