import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Checking } from "../pages/Checking";
import { Prayers } from "../pages/Prayers";
import { Notices } from "../pages/Notices";
import { Activities } from "../pages/Activities";
import { Menubar } from "primereact/menubar";
import { NotFound } from "../pages/NotFound";
import { ResetPassword } from "../pages/ResetPassword";
import { AddUserAdmin } from "../pages/AddUserAdmin";

export const AppRouter = () => {
  // const { status } = useAppSelector((state) => state.auth);
  const status = useCheckAuth();

  if (status === "checking-credentials") {
    return <Checking />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {status === "is-authenticated" ? (
          <>
            <Route path="/" element={<Activities />} />
            <Route path="/oraciones" element={<Prayers />} />
            <Route path="/anuncios" element={<Notices />} />
            <Route path="/actividades" element={<Activities />} />
            <Route path="/add-admin" element={<AddUserAdmin />} />
            <Route path="/*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/restablecer" element={<ResetPassword />} />
            <Route path="/*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
