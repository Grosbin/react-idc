import { MenuBar } from "../components/ui/MenuBar";
import { FormPrayers } from "../components/prayers/FormPrayers";

import { Card } from "primereact/card";
import { CardPrayers } from "../components/prayers/CardPrayers";
import { useAppSelector } from "../hooks/useRedux";
import { useEffect, useState } from "react";
import { actionPrayer } from "../actions/actionPrayer";
import { MemberNamePrayers } from "../components/prayers/MemberNamePrayers";
import { ItemPrayers } from "../components/prayers/ItemPrayers";
import { useNavigate } from "react-router-dom";

export const Prayers = () => {
  const navigate = useNavigate();

  const { prayers, onAmbitPrayerActive } = useAppSelector(
    state => state.prayer
  );
  const { startLoadingPrayer } = actionPrayer();
  const [loadingPrayer, setLoadingPrayer] = useState<boolean>(false);
  const [prayerData, setPrayerData] = useState<
    {
      id: string;
      type: string;
      names: string[];
    }[]
  >([]);

  useEffect(() => {
    startLoadingPrayer();
  }, []);

  useEffect(() => {
    loadPrayersData();
  }, [onAmbitPrayerActive]);

  useEffect(() => {
    loadPrayersData();
    console.log("prayers", prayers);
  }, [prayers]);

  const loadPrayersData = async () => {
    let data = prayers.filter(
      prayer => prayer.type === onAmbitPrayerActive.ambit
    );
    if (data) {
      setPrayerData(data);
    }
  };

  return (
    <>
      <MenuBar />

      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "#fff",
        }}
      >
        {/* <ItemPrayers icon="pi pi-user" type="Miembros" counter="10" /ItemPrayers> */}

        {prayers.map(p => (
          <ItemPrayers
            key={p.id}
            type={p.type}
            counter={p.names.length.toString()}
            redirect={() =>
              navigate("/oraciones-data", { state: { ambit: p.type } })
            }
          />
        ))}
      </div>

      <div className="prayers__container">
        <div className="grid">
          <div className="col-12 md:col-12 lg:col-6">
            <FormPrayers />
          </div>
          <div className="col-12 md:col-12 lg:col-6">
            <div className="grid">
              {prayerData.map(({ names, id }, i) => (
                <div className="col-12 md:col-12 lg:col-12" key={i}>
                  {/* <CardPrayers {...prayer} /> */}
                  {names.map((name, i) => (
                    <MemberNamePrayers
                      key={i}
                      name={name}
                      id={id}
                      index={i}
                      type={onAmbitPrayerActive.ambit}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
