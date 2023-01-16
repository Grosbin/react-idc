import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ScrollPanel } from "primereact/scrollpanel";
import { ListBox } from "primereact/listbox";
import { actionPrayer } from "../../actions/actionPrayer";
import { useAppSelector } from "../../hooks/useRedux";
import { actionNotice } from "../../actions/actionNotice";

interface Props {
  id: string;
  title: string;
  description: string;
}

export const CardNotice = ({ title, description, id }: Props) => {
  const { onUpdateNotice } = useAppSelector((state) => state.notice);
  const { startRemoveNotice, startOnNoticeActive, startOnUpdateNotice } =
    actionNotice();

  const removeNotice = (id: string) => {
    startRemoveNotice(id);
  };

  const updateNotice = (notice: Props) => {
    startOnNoticeActive(notice);
    startOnUpdateNotice();
  };

  const footer = (notice: Props) => (
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
        onClick={() => updateNotice(notice)}
        disabled={onUpdateNotice}
      />
      <Button
        label="Borrar"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={() => removeNotice(notice.id)}
        disabled={onUpdateNotice}
      />
    </div>
  );
  return (
    <Card
      style={{ backgroundColor: "#3b46f1" }}
      title={title}
      footer={() => footer({ title, description, id })}
    >
      <ScrollPanel style={{ width: "100%", height: "150px" }}>
        <p>{description}</p>
      </ScrollPanel>
    </Card>
  );
};
