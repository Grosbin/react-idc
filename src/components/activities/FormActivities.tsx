import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";

import { Dropdown } from "primereact/dropdown";

interface defaultValues {
  prayers: string;
  type: { ambit: string };
}

type FormPrayersProps = "prayers" | "type";

const defaultValuesData: defaultValues = {
  prayers: "",
  type: { ambit: "" },
};

export const FormActivities = () => {
  const [formData, setFormData] = useState<defaultValues>({} as defaultValues);

  const {
    getValues,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: formData });

  const getFormErrorMessage = (name: FormPrayersProps) => {
    return (
      errors[name] && <small className="p-error">{errors[name]?.message}</small>
    );
  };
  const onSubmit = (data: defaultValues) => {
    setFormData(data);

    clearForm();
  };

  const clearForm = () => {
    reset();
  };
  return (
    <div className="form-demo">
      <div className="">
        <div className="card">
          {/* <h5 className="text-center">Register</h5> */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
