import { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useForm, Controller, set } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectNamePrayers } from "./SelectNamePrayers";
import { Dropdown } from "primereact/dropdown";
import { actionPrayer } from "../../actions/actionPrayer";
import { useAppSelector } from "../../hooks/useRedux";
import { MultiSelect } from "primereact/multiselect";
import { actionMember } from "../../actions/actionMember";

interface defaultValues {
  prayers: string;
  type: { ambit: string };
}

type FormPrayersProps = "prayers" | "type";

const defaultValuesData: defaultValues = {
  prayers: "",
  type: { ambit: "" },
};

const fieldAmbit = [
  { ambit: "Salud" },
  { ambit: "Familias" },
  { ambit: "Seguridad" },
  { ambit: "Fortaleza" },
];

export const FormPrayers = () => {
  const { onPrayerActive, onCreatePrayer, onUpdatePrayer } = useAppSelector(
    state => state.prayer
  );
  const { members } = useAppSelector(state => state.member);
  const {
    startAddPrayer,
    startUpdatePrayer,
    startOnPrayerActive,
    startOnCreatePrayer,
    startOnActiveAmbitPrayer,
  } = actionPrayer();
  const { startAddMember, startLoadingMember } = actionMember();
  const [formData, setFormData] = useState<defaultValues>({} as defaultValues);
  const [selectAmbit, setSelectAmbit] = useState<{ ambit: string }[]>([]);
  const [ambit, setAmbit] = useState<{ ambit: string } | null>(null);
  const [cities, setCities] = useState<{ name: string }[]>([]);

  useEffect(() => {
    setSelectAmbit(fieldAmbit);
    setFormData(defaultValuesData);
    startLoadingMember();
  }, []); //

  useEffect(() => {
    if (ambit) {
      startOnActiveAmbitPrayer(ambit);
    }
    const cities = members.map(member => {
      return member;
    });

    setCities(cities);

    console.log(cities);
    console.log(members);
    console.log(selectedCities);
  }, [ambit]);

  useEffect(() => {
    const defaultValuesActive: defaultValues = {
      prayers: onPrayerActive.names.join("\n"),
      type: { ambit: onPrayerActive.type },
    };
    setFormData(defaultValuesActive);
  }, [onPrayerActive, onUpdatePrayer]);

  const {
    getValues,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: formData });

  const onSubmit = (data: defaultValues) => {
    setFormData(data);

    if (onCreatePrayer) {
      onCreateForm(data);
    }

    if (onUpdatePrayer) {
      onUpdateForm();
    }

    clearForm();
  };

  const onCreateForm = (data: defaultValues) => {
    const { prayers, type } = data;
    const prayersArray = prayers.split("\n");

    const prayer = {
      type: type.ambit,
      names: prayersArray,
    };
    startAddPrayer(prayer);
  };

  const onUpdateForm = () => {
    const { type: typeValues, prayers: prayersValues } = getValues();
    let prayersArray;
    prayersValues
      ? (prayersArray = prayersValues.split("\n"))
      : (prayersArray = formData.prayers.split("\n"));
    const prayer = {
      id: onPrayerActive.id,
      type: typeValues === undefined ? formData.type.ambit : typeValues.ambit,
      names: prayersArray,
    };
    startUpdatePrayer(prayer);
  };

  const clearForm = () => {
    startOnPrayerActive({
      id: "",
      type: "",
      names: [],
    });

    startOnCreatePrayer();
    setFormData(defaultValuesData);
    reset();
  };

  const getFormErrorMessage = (name: FormPrayersProps) => {
    return (
      errors[name] && <small className="p-error">{errors[name]?.message}</small>
    );
  };

  const [selectedCities, setSelectedCities] = useState<[]>([]);
  const [showAddButton, setShowAddButton] = useState(false);
  const multiselectRef = useRef(null);

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
    console.log(cities);
    const filter = cities.find(city => city.name === member);

    if (member === "") {
      setShowAddButton(false);
    } else {
      setShowAddButton(true);
    }
  };

  return (
    <div className="" style={{ marginTop: 30 }}>
      <div className="">
        <div className="card">
          {/* <h5 className="text-center">Register</h5> */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field" style={{ marginBottom: 25 }}>
              <span className="p-float-label">
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: onCreatePrayer }}
                  render={({ field }) => {
                    // let value: string | { ambit: string } =
                    //   field.value ?? formData.type;

                    return (
                      <Dropdown
                        value={ambit}
                        onChange={e => setAmbit(e.value)}
                        options={selectAmbit}
                        optionLabel="ambit"
                      />
                    );
                  }}
                />

                <label
                  htmlFor="ambit"
                  className={classNames({ "p-error": errors.type })}
                >
                  Oración Por: *
                </label>
              </span>

              {getFormErrorMessage("type")}
            </div>

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
                selectedItemsLabel={`${selectedCities?.length} miembros seleccionados`}
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
          </form>
          <div className="flex gap-5 mt-5">
            <Button
              label="Guardar"
              type="submit"
              className="p-button-primary"
            />
            <Button
              label="Cancelar"
              type="button"
              // icon="pi pi-times"
              className="p-button-secondary"
              onClick={clearForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
