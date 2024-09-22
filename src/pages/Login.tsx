import { FormLogin } from "../components/auth/FormLogin";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const img = (
    <img
      style={{ width: 100, paddingTop: 20 }}
      alt="Iglesia de Cristo"
      src="logo/Logo_Blanco.png"
    />
  );

  return (
    <div
      className="bg"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        justifyItems: "center",
      }}
    >
      <img
        style={{ width: 100, paddingTop: 20, marginBottom: 30 }}
        alt="Iglesia de Cristo"
        src="logo/Logo_Blanco.png"
      />
      <div
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          width: "80%",
          maxWidth: 400,
        }}
      >
        <FormLogin />
        <div
          style={{ marginTop: 15, display: "flex", justifyContent: "flex-end" }}
        >
          <a
            onClick={() => {
              navigate("/restablecer");
            }}
            style={{ cursor: "pointer", color: "#d4d4d4" }}
          >
            Olvide mi contraseña
          </a>
        </div>
      </div>
    </div>
  );
};
