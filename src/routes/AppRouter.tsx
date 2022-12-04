import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Checking } from "../pages/Checking";

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
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/*" element={<Login />} />
        )}
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/*" element={<Login />} />
        {/* <Route path="/oraciones" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
