import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { useAppSelector } from "../../hooks/useRedux";
import { actionPrayer } from "../../actions/actionPrayer";
import { useState } from "react";
interface Props {
  id: string;
  type: string;
  name: string;
  index: number;
}

export const MemberNamePrayers = ({ type, name, id, index }: Props) => {
  const { prayers } = useAppSelector(state => state.prayer);
  const { startUpdatePrayer } = actionPrayer();
  const [loadingPrayer, setLoadingPrayer] = useState<boolean>(false);

  const removeNamePrayer = (
    id: string,
    type: string,
    name: string,
    index: number
  ) => {
    setLoadingPrayer(true);
    // Buscar la oración por su ID
    const originalPrayer = prayers.find(prayer => prayer.id === id);

    if (originalPrayer) {
      // Filtrar el arreglo de nombres para eliminar el nombre en el índice dado
      const newNames = originalPrayer.names.filter((_, i) => i !== index);

      // Actualizar el estado solo si hay cambios
      if (newNames.length !== originalPrayer.names.length) {
        const updatedPrayers = prayers.map(prayer => {
          if (prayer.id === id && prayer.type === type) {
            return { ...prayer, names: newNames };
          }
          return prayer;
        });
        // Dispatch para actualizar el estado global con las oraciones actualizadas
        let updatedPrayersNew = updatedPrayers.find(prayer => prayer.id === id);
        if (updatedPrayersNew) {
          startUpdatePrayer(updatedPrayersNew);
          console.log(updatedPrayersNew);
        }
      }
    }

    setTimeout(() => {
      setLoadingPrayer(false);
    }, 500);
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fff",
        height: "50px",
        marginTop: "15px",
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <p style={{ marginLeft: "20px", textAlign: "start", color: "#757575" }}>
        {name}
      </p>
      {/* <div
        style={{
          position: "absolute",
          right: 0,
          height: "100%",
          width: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
        }}
        onClick={() => removeNamePrayer(id, type, name, index)}
      >
        x
      </div> */}
      <Button
        icon="pi pi-times"
        style={{
          position: "absolute",
          right: 0,
          height: "100%",
          width: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          backgroundColor: "#fff",
          color: "#d4d4d4",
          borderStyle: "none",
        }}
        disabled={loadingPrayer}
        loading={loadingPrayer}
        onClick={() => removeNamePrayer(id, type, name, index)}
      />
    </div>
  );
};
