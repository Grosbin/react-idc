import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { actionPrayer } from "../../actions/actionPrayer";

export const PrayerData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startLoadingPrayer } = actionPrayer();
  const { prayers } = useAppSelector(state => state.prayer);

  const [prayersData, setPrayersData] = useState<
    {
      id: string;
      type: string;
      names: string[];
    }[]
  >([{ id: "", type: "", names: [] }]);

  const { ambit } = location.state || "undefined";

  useEffect(() => {
    if (ambit === "undefined") {
      navigate("/oraciones");
    }
    startLoadingPrayer();
    const prayerAmbit = prayers.filter(prayer => prayer.type === ambit);
    setPrayersData(prayerAmbit);
  }, [ambit, prayers]);

  // Función para dividir los datos en subarrays de 10 elementos
  const chunk = (array: Array<string>, size: number) => {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i += size) {
      chunked_arr.push(array.slice(i, i + size));
    }
    return chunked_arr;
  };

  // Renderizado de tarjetas
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "70px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => navigate("/oraciones")}
        >
          <i
            className="pi pi-arrow-left"
            style={{ fontSize: "22px", color: "#757575" }}
          ></i>
        </div>
      </div>
      <h1 style={{ fontSize: "3rem", marginLeft: "5%", color: "#0dc4ae" }}>
        {prayersData[0]?.type}
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "30px",
        }}
      >
        {prayersData.map(prayer =>
          chunk(prayer.names, 10).map((group, index) => (
            <div
              key={index}
              style={{
                width: "290px",
                margin: "10px",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "10px",
              }}
            >
              <ul
                style={{
                  listStyleType: "none",
                  margin: "0px",
                  padding: "0px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                {group.map((name, i) => (
                  <li style={{ color: "#757575" }} key={i}>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
};
