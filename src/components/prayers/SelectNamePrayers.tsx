import React, { useState, useEffect, useRef } from "react";
import { MultiSelect } from "primereact/multiselect";

export function SelectNamePrayers() {
  const [selectedCities, setSelectedCities] = useState(null);
  const [showAddButton, setShowAddButton] = useState(false);
  const multiselectRef = useRef(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const handleFocus = () => {
    setTimeout(() => {
      const input = document.querySelector(
        ".p-multiselect-panel .p-multiselect-filter-container .p-inputtext"
      );
      if (input) {
        // @ts-ignore
        input.focus();
      }
    }, 150);
  };

  const filterMember = (name: string) => {
    const member = name;
    console.log("Agregar nuevo miembro", member);
    const filter = cities.find(city => city.name === member);

    if (filter || member === "") {
      setShowAddButton(false);
    } else {
      setShowAddButton(true);
    }
  };

  return (
    <div
      className="card flex justify-content-center"
      ref={multiselectRef}
      onClick={handleFocus}
      style={{ position: "relative" }}
    >
      <MultiSelect
        value={selectedCities}
        options={cities}
        optionLabel="name"
        filter
        placeholder="Miembros"
        emptyFilterMessage="No se encontraron miembros"
        maxSelectedLabels={3}
        className="w-full"
        onChange={e => {
          setSelectedCities(e.value);
          handleFocus();
        }}
        onFilter={e => {
          filterMember(e.filter);
        }}
      />
      {showAddButton && (
        <button
          className="p-button p-component p-button-raised p-button-primary mt-2"
          onClick={() => console.log("Agregar nuevo miembro")}
          style={{
            position: "absolute",
            zIndex: 1,
            width: "50px",
            bottom: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          +
        </button>
      )}
    </div>
  );
}
