import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";

import { Dropdown } from "primereact/dropdown";
import { actionPrayer } from "../actions/actionPrayer";

interface defaultValues {
  prayers: string;
  type: { ambit: string };
}

type FormPrayersProps = "prayers" | "type";

export const FormPrayers = () => {
  const defaultValues: defaultValues = {
    prayers: "",
    type: { ambit: "" },
  };
  const { startAddPrayer } = actionPrayer();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState(defaultValues);
  const [selectAmbit, setSelectAmbit] = useState<{ ambit: string }[]>([]);

  const fieldAmbit = [
    { ambit: "Salud" },
    { ambit: "Familias" },
    { ambit: "Seguridad" },
    { ambit: "Fortalezas" },
  ];

  useEffect(() => {
    setSelectAmbit(fieldAmbit);
  }, []); //

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data: defaultValues) => {
    setFormData(data);
    // setShowMessage(true);
    const { prayers, type } = data;

    //crear array de prayers separados por linea
    const prayersArray = prayers.split("\n");

    console.log("oraciones: ", prayersArray, " type: ", type.ambit);
    const prayer = {
      type: type.ambit,
      names: prayersArray,
    };
    startAddPrayer(prayer);
    // startAddPrayer(type, prayers);
    // console.log(data);

    reset();
  };

  const getFormErrorMessage = (name: FormPrayersProps) => {
    return (
      errors[name] && <small className="p-error">{errors[name]?.message}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  return (
    <div className="form-demo">
      {/* <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is registered under name <b>{formData.prayers}</b> ;
            it'll be valid next 30 days without activation. Please check{" "}
            <b>{formData.prayers}</b> for activation instructions.
          </p>
        </div>
      </Dialog> */}

      <div className="">
        <div className="card">
          {/* <h5 className="text-center">Register</h5> */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field" style={{ marginBottom: 25 }}>
              <span className="p-float-label">
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Dropdown
                      // id={field.type}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={selectAmbit}
                      optionLabel="ambit"
                    />
                  )}
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
                    required: true,
                    maxLength: {
                      value: 500,
                      message:
                        "La lista es muy larga, por favor ingrese menos de 500 caracteres",
                    },
                  }}
                  render={({ field }) => (
                    <InputTextarea
                      // id={field.prayers}
                      {...field}
                      rows={5}
                      cols={100}
                      autoResize
                    />
                  )}
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
            <Button label="Guardar" />
          </form>
        </div>
      </div>
    </div>
  );
};
