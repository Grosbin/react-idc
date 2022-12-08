import React from "react";
import ReactDOM from "react-dom/client";
import { MenuBar } from "./components/ui/MenuBar";
import IglesiaDeCristo from "./IglesiaDeCristo";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <MenuBar /> */}
    <IglesiaDeCristo />
  </React.StrictMode>
);
