import React from "react";
import AppRouter from "./router";
import { Provider } from "react-redux";
import store from "./redux/store";
import WithWeb3 from "./hocs/WithWeb3/withWeb3.hoc";
import Modals from "./components/organisms/Modals";
import WithLingui from "./hocs/WithLingui/withLingui.hoc";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <WithLingui>
        <WithWeb3 useWeb3Listener={true}>
          <AppRouter/>
          <Modals/>
          <ToastContainer
            autoClose={2000}
            newestOnTop={true}
            position={"bottom-right"}
            theme={"dark"}
          />
        </WithWeb3>
      </WithLingui>
    </Provider>
  );
};

export default App;
