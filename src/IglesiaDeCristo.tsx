// import "primereact/resources/themes/lara-dark-blue/theme.css"; //theme
// import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { Provider } from "react-redux";
import store from "./store/store";

import "./styles/styles.css";
import { AppRouter } from "./routes/AppRouter";
import { MenuBar } from "./components/MenuBar";

const IglesiaDeCristo = () => {
  return (
    <Provider store={store}>
      {/* <MenuBar /> */}
      <AppRouter />
    </Provider>
  );
};

export default IglesiaDeCristo;
