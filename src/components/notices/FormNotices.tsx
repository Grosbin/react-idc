import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm, Controller, DefaultValues } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { actionNotice } from "../../actions/actionNotice";

interface defaultValues {
  title: string;
  description: string;
}

type FormNoticesProps = "title" | "description";

const defaultValuesData: defaultValues = {
  title: "",
  description: "",
};

export const FormNotices = () => {
  const [formData, setFormData] = useState<defaultValues>({} as defaultValues);
  const { startAddNotice } = actionNotice();

  const {
    getValues,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: formData });

  useEffect(() => {
    setFormData(defaultValuesData);
  }, []);

  const onSubmit = (data: defaultValues) => {
    console.log("data", data);
    const date = new Date().toString();
    startAddNotice({ date, ...data });
  };

  const clearForm = () => {
    reset(defaultValuesData);
  };

  const getFormErrorMessage = (name: FormNoticesProps) => {
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
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: false,
                    minLength: {
                      value: 3,
                      message: "El titulo debe tener al menos 3 caracteres.",
                    },
                    maxLength: {
                      value: 30,
                      message: "El titulo debe tener máximo 30 caracteres.",
                    },
                  }}
                  render={({ field }) => {
                    let value = field.value ?? formData.title;
                    return (
                      <InputText
                        value={value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        // className={classNames({
                        //   "p-invalid": fieldState.invalid,
                        // })}
                      />
                    );
                  }}
                />

                <label
                  htmlFor="title"
                  className={classNames({ "p-error": errors.title })}
                >
                  Titulo*
                </label>
              </span>

              {getFormErrorMessage("title")}
            </div>
            <div className="field">
              <span className="p-float-label" style={{ marginTop: 10 }}>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: true,
                    maxLength: {
                      value: 500,
                      message:
                        "La lista es muy larga, por favor ingrese menos de 500 caracteres",
                    },
                  }}
                  render={({ field }) => {
                    let value = field.value ?? formData.description;
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
                  htmlFor="description"
                  className={classNames({ "p-error": errors.description })}
                >
                  Descripción*
                </label>
              </span>
              {getFormErrorMessage("description")}
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
