import { FormLogin } from "../components/FormLogin";
import { Card } from "primereact/card";
export const Login = () => {
  const img = (
    <img
      style={{ width: 100, paddingTop: 20 }}
      alt="Iglesia de Cristo"
      src="logo/Logo_Blanco.png"
    />
  );

  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b46f1",
      }}
    >
      <Card title="Iniciar Sesión" header={img}>
        <FormLogin />
      </Card>
    </div>
  );
};
