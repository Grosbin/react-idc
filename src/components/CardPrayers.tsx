import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { ListBox } from "primereact/listbox";
import { actionPrayer } from "../actions/actionPrayer";

interface Props {
  type: string;
  prayers: string[];
}

export const CardPrayers = ({ type, prayers }: Props) => {
  const { startRemovePrayer } = actionPrayer();
  const removePrayer = (prayer: any) => {
    console.log(prayer);
    startRemovePrayer(prayer);
  };

  const footer = (prayer: any) => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        label="Editar"
        icon="pi pi-check"
        style={{ marginRight: ".25em" }}
      />
      <Button
        label="Borrar"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={() => removePrayer(type)}
      />
    </div>
  );
  return (
    <Card title={`Oración por: ${type}`} footer={() => footer(prayers)}>
      <ol>
        {prayers.map((prayer, index) => (
          <li key={index}>{prayer}</li>
        ))}
      </ol>
    </Card>
  );
};
