import { useState, useEffect } from "react";

interface Props {
  type: string;
  counter: string;
}

export const ItemPrayers = ({ type, counter }: Props) => {
  const [iconPrayer, setIconPrayer] = useState<string>("pi pi-user");

  useEffect(() => {
    switch (type) {
      case "Salud":
        setIconPrayer("pi pi-heart");
        break;
      case "Familias":
        setIconPrayer("pi pi-users");
        break;
      case "Seguridad":
        setIconPrayer("pi pi-lock");
        break;
      case "Fortaleza":
        setIconPrayer("pi pi-star");
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div className="prayers__item">
      <div className="prayers__item-icon">
        <i className={`pi ${iconPrayer} item__icon`}></i>
        <p className="item__text">{type}</p>
      </div>
      <p className="item__counter">{counter}</p>
    </div>
  );
};
