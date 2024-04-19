import { MenuBar } from "../components/ui/MenuBar";
import { FormPrayers } from "../components/prayers/FormPrayers";

import { Card } from "primereact/card";
import { CardPrayers } from "../components/prayers/CardPrayers";
import { useAppSelector } from "../hooks/useRedux";
import { useEffect, useState } from "react";
import { actionPrayer } from "../actions/actionPrayer";

export const Prayers = () => {
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

      <div className="prayers__container">
        <div className="grid">
          <div className="col-12 md:col-12 lg:col-6">
            <FormPrayers />
          </div>
          <div className="col-12 md:col-12 lg:col-6">
            <div className="grid">
              {prayerData.map((prayer, i) => (
                <div className="col-12 md:col-6 lg:col-6" key={i}>
                  <CardPrayers {...prayer} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
