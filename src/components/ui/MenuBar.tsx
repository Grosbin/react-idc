import { Menubar } from "primereact/menubar";
import { SplitButton } from "primereact/splitbutton";
import { useNavigate } from "react-router-dom";
import { actionAuth } from "../../actions/actionAuth";

export const MenuBar = () => {
  const navigate = useNavigate();
  const { startLogout } = actionAuth();
  const items = [
    {
      label: "Actividades",
      icon: "pi pi-calendar",
      role: "admin",
      command: () => {
        navigate("/actividades");
      },
    },
    {
      label: "Oraciones",
      icon: "pi pi-heart",
      role: "admin",
      command: () => {
        navigate("/oraciones");
      },
    },
    {
      label: "Anuncios",
      icon: "pi pi-comment",
      role: "admin",
      command: () => {
        navigate("/anuncios");
      },
    },
  ];

  const itemsUser = [
    {
      label: "Agregar Admin",
      icon: "pi pi-user-plus",
      command: () => {
        navigate("/add-admin");
      },
    },
    {
      label: "Cerrar Sesión",
      icon: "pi pi-sign-out",
      command: () => {
        startLogout();
        navigate("/");
      },
    },
  ];

  const start = (
    <img
      alt="logo"
      src="logo/Logo_Azul.png"
      height="40"
      className="mr-2"
      onClick={() => navigate("/")}
    ></img>
  );

  const end = (
    <div
      style={{
        backgroundColor: "#3b46f1",
        borderRadius: 10,
        width: "100%",
      }}
    >
      <SplitButton icon="pi pi-user" model={itemsUser} />
    </div>
  );

  return (
    <nav style={{ background: "aliceblue" }}>
      <Menubar
        className="menu-icon__none"
        // model={items}
        start={start}
        end={end}
        style={{
          justifyContent: "space-between",
          backgroundColor: "aliceblue",
        }}
      />
    </nav>
  );
};
