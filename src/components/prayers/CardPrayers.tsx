import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { ScrollPanel } from "primereact/scrollpanel";

import { ListBox } from "primereact/listbox";
import { actionPrayer } from "../../actions/actionPrayer";
import { useAppSelector } from "../../hooks/useRedux";

interface Props {
  id: string;
  type: string;
  names: string[];
}

export const CardPrayers = ({ type, names, id }: Props) => {
  const { onUpdatePrayer } = useAppSelector((state) => state.prayer);

  const { startRemovePrayer, startOnUpdatePrayer, startOnPrayerActive } =
    actionPrayer();

  const removePrayer = (id: string) => {
    startRemovePrayer(id);
  };

  const updatePrayer = (prayer: Props) => {
    startOnPrayerActive(prayer);
    startOnUpdatePrayer();
    // startUpdatePrayer(prayer);
  };

  const footer = (prayer: Props) => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        label="Editar"
        icon="pi pi-check"
        className="p-button-success"
        style={{ marginRight: ".25em" }}
        onClick={() => updatePrayer(prayer)}
        disabled={onUpdatePrayer}
      />
      <Button
        label="Borrar"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={() => removePrayer(prayer.id)}
        disabled={onUpdatePrayer}
      />
    </div>
  );
  return (
    <Card
      style={{ backgroundColor: "#3b46f1" }}
      title={`Oración por: ${type}`}
      footer={() => footer({ type, names, id })}
    >
      <ScrollPanel style={{ width: "100%", height: "200px" }}>
        <ol>
          {names.map((prayer, index) => (
            <li key={index}>{prayer}</li>
          ))}
        </ol>
      </ScrollPanel>
    </Card>
  );
};
