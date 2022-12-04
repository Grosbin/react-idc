import { Menubar } from "primereact/menubar";
import { SplitButton } from "primereact/splitbutton";
import { actionAuth } from "../actions/actionAuth";

export const MenuBar = () => {
  const { startLogout } = actionAuth();
  const items = [
    {
      label: "Actividades",
      icon: "pi pi-calendar",
      role: "admin",
    },
    {
      label: "Oraciones",
      icon: "pi pi-heart",
      role: "admin",
    },
    {
      label: "Anuncios",
      icon: "pi pi-comment",
      role: "admin",
    },
  ];

  const itemsUser = [
    {
      label: "Cerrar Sesión",
      icon: "pi pi-sign-out",
      command: () => {
        startLogout();
      },
    },
  ];

  let nameItem = "Usuario";

  const start = (
    <img alt="logo" src="logo/Logo_Azul.png" height="40" className="mr-2"></img>
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

  console.log("MenuBar");

  return (
    <nav style={{ background: "#343e4d" }}>
      <Menubar
        model={items}
        start={start}
        end={end}
        style={{
          justifyContent: "space-between",
        }}
      />
    </nav>
  );
};
