import { RouteType } from "@consts";
import { Route, Routes } from "react-router-dom";
import { routes } from "@routes";
import { HashRouter } from "react-router-dom";
import { Header } from "./components";
import { setupStore } from "@store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import axios from "axios";

const renderRoutes = (routes: RouteType[]) => {
  return routes.map((route: RouteType, idx: number) => {
    return <Route key={idx} path={route.path} element={route.element} />;
  });
};

function App() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  return (
    <HashRouter>
      <SnackbarProvider>
        <Provider store={setupStore()}>
          <Header />
          {<Routes>{renderRoutes(routes)}</Routes>}
        </Provider>
      </SnackbarProvider>
    </HashRouter>
  );
}

export default App;
