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
    <div className="bg">
      <Card
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          minWidth: 400,
        }}
        header={img}
      >
        <FormLogin />
        <div
          style={{ marginTop: 15, display: "flex", justifyContent: "flex-end" }}
        >
          <a
            onClick={() => {
              navigate("/restablecer");
            }}
            style={{ cursor: "pointer" }}
          >
            Olvide mi contraseña
          </a>
        </div>
      </Card>
    </div>
  );
};
