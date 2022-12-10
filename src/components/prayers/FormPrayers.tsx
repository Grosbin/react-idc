import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";

import { Dropdown } from "primereact/dropdown";
import { actionPrayer } from "../../actions/actionPrayer";
import { useAppSelector } from "../../hooks/useRedux";

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
  { ambit: "Fortalezas" },
];

export const FormPrayers = () => {
  const { onPrayerActive, onCreatePrayer, onUpdatePrayer } = useAppSelector(
    (state) => state.prayer
  );
  const {
    startAddPrayer,
    startUpdatePrayer,
    startOnPrayerActive,
    startOnCreatePrayer,
  } = actionPrayer();
  const [formData, setFormData] = useState<defaultValues>({} as defaultValues);
  const [selectAmbit, setSelectAmbit] = useState<{ ambit: string }[]>([]);

  useEffect(() => {
    setSelectAmbit(fieldAmbit);
    setFormData(defaultValuesData);
  }, []); //

  useEffect(() => {
    const defaultValuesActive: defaultValues = {
      prayers: onPrayerActive.names.join("\n"),
      type: { ambit: onPrayerActive.type },
    };
    console.log("defaultValuesActive", defaultValuesActive);
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
                    let value: string | { ambit: string } =
                      field.value ?? formData.type;

                    return (
                      <Dropdown
                        value={value}
                        onChange={(e) => field.onChange(e.value)}
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

            <div className="field">
              <span className="p-float-label" style={{ marginTop: 10 }}>
                <Controller
                  name="prayers"
                  control={control}
                  rules={{
                    required: onCreatePrayer,
                    maxLength: {
                      value: 500,
                      message:
                        "La lista es muy larga, por favor ingrese menos de 500 caracteres",
                    },
                  }}
                  render={({ field }) => {
                    let value = field.value ?? formData.prayers;
                    return (
                      <InputTextarea
                        value={value}
                        rows={5}
                        cols={100}
                        autoResize
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    );
                  }}
                />
                <label
                  htmlFor="prayers"
                  className={classNames({ "p-error": errors.prayers })}
                >
                  Nombres*
                </label>
              </span>
              {getFormErrorMessage("prayers")}
            </div>
            <div className="flex gap-5">
              <Button
                label="Guardar"
                type="submit"
                className="p-button-success"
              />
              <Button
                label="Cancelar"
                type="button"
                icon="pi pi-times"
                className="p-button-secondary"
                onClick={clearForm}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
