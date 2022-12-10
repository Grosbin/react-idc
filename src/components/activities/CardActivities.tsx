import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Tooltip } from "primereact/tooltip";
import { actionPrayer } from "../../actions/actionPrayer";
import { useAppSelector } from "../../hooks/useRedux";
import { actionActivity } from "../../actions/actionActivity";

interface Props {
  id: string;
  title: string;
  description: string;
  day: string;
  hour: string;
}

export const CardActivities = ({
  id,
  title,
  description,
  day,
  hour,
}: Props) => {
  const { onUpdateActivity } = useAppSelector((state) => state.activity);

  const { startRemoveActivity } = actionActivity();

  const removeActivity = (id: string) => {
    console.log(id);
    startRemoveActivity(id);
  };

  const updateActivity = (activity: Props) => {
    // startOnPrayerActive(activity);
    // startOnUpdatePrayer();
    // startUpdatePrayer(prayer);
  };

  const footer = (activity: Props) => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {/* <Button
        label="Editar"
        icon="pi pi-check"
        className="p-button-success"
        style={{ marginRight: ".25em" }}
        onClick={() => updateActivity(activity)}
        disabled={onUpdateActivity}
      /> */}
      <Button
        label="Borrar"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={() => removeActivity(activity.id)}
        disabled={onUpdateActivity}
      />
    </div>
  );
  return (
    <>
      <Tooltip
        target=".card-activity"
        position="bottom"
        style={{ maxWidth: 400 }}
      />
      <span className="card-activity" data-pr-tooltip={description}>
        <Card
          style={{ backgroundColor: "#3b46f1" }}
          footer={() => footer({ id, title, description, day, hour })}
        >
          <h1>{title}</h1>
          <h3>{day}</h3>
          <h3>
            {" "}
            <i
              className="pi pi-clock"
              style={{ color: "#0dc4ae", fontSize: 17 }}
            ></i>{" "}
            {hour}
          </h3>
          {/* <p>{description}</p> */}
        </Card>
      </span>
    </>
  );
};
