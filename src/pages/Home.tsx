import { MenuBar } from "../components/MenuBar";
import { FormPrayers } from "../components/FormPrayers";

import { Card } from "primereact/card";
import { CardPrayers } from "../components/CardPrayers";
import { useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { actionPrayer } from "../actions/actionPrayer";

export const Home = () => {
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
              <FormPrayers />
            </Card>
          </div>
          <div className="col-12 md:col-12 lg:col-9">
            <div className="grid">
              {prayers.map((prayer, i) => (
                <div className="col-12 md:col-12 lg:col-6" key={i}>
                  <CardPrayers prayers={prayer.names} type={prayer.type} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
