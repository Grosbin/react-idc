import { MenuBar } from "../components/ui/MenuBar";
import { FormPrayers } from "../components/prayers/FormPrayers";

import { Card } from "primereact/card";
import { CardPrayers } from "../components/prayers/CardPrayers";
import { useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { actionPrayer } from "../actions/actionPrayer";
import { FormActivities } from "../components/activities/FormActivities";
import { CardActivities } from "../components/activities/CardActivities";
import { actionActivity } from "../actions/actionActivity";

export const Activities = () => {
  const { activities } = useAppSelector((state) => state.activity);
  const { startLoadingActivity } = actionActivity();

  useEffect(() => {
    startLoadingActivity();
  }, []);

  return (
    <>
      <MenuBar />

      <div className="prayers__container">
        <div className="grid">
          <div className="col-12 md:col-12 lg:col-4">
            <Card title="Actividades">
              <FormActivities />
            </Card>
          </div>
          <div className="col-12 md:col-12 lg:col-6">
            <div className="grid">
              {activities.map((activity, i) => (
                <div className="col-12 md:col-6 lg:col-6" key={i}>
                  <CardActivities {...activity} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
