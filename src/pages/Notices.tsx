import { MenuBar } from "../components/ui/MenuBar";
import { FormPrayers } from "../components/prayers/FormPrayers";

import { Card } from "primereact/card";
import { CardPrayers } from "../components/prayers/CardPrayers";
import { useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { actionPrayer } from "../actions/actionPrayer";
import { FormNotices } from "../components/notices/FormNotices";
import { actionNotice } from "../actions/actionNotice";
import { CardNotice } from "../components/notices/CardNotices";

export const Notices = () => {
  const { notices } = useAppSelector((state) => state.notice);
  const { startLoadingNotice } = actionNotice();

  useEffect(() => {
    startLoadingNotice();
  }, []);

  return (
    <>
      <MenuBar />

      <div className="prayers__container">
        <div className="grid">
          <div className="col-12 md:col-12 lg:col-4">
            <Card title="Anuncios">
              <FormNotices />
            </Card>
          </div>
          <div className="col-12 md:col-12 lg:col-6">
            <div className="grid">
              {notices.map((notice, i) => (
                <div className="col-12 md:col-6 lg:col-6" key={i}>
                  <CardNotice {...notice} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
