import { MenuBar } from "../components/ui/MenuBar";
import { FormPrayers } from "../components/prayers/FormPrayers";

import { Card } from "primereact/card";
import { CardPrayers } from "../components/prayers/CardPrayers";
import { useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { actionPrayer } from "../actions/actionPrayer";
import { FormActivities } from "../components/activities/FormActivities";

export const Activities = () => {
  const { prayers } = useAppSelector((state) => state.prayer);
  const { startLoadingPrayer } = actionPrayer();

  useEffect(() => {
    startLoadingPrayer();
  }, []);

  return (
    <>
      <MenuBar />

      <div className="prayers__container">
        <div className="grid">
          <div className="col-12 md:col-12 lg:col-3">
            <Card>
              <FormActivities />
            </Card>
          </div>
          <div className="col-12 md:col-12 lg:col-9">
            <div className="grid">
              {prayers.map((prayer, i) => (
                <div className="col-12 md:col-12 lg:col-6" key={i}>
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
