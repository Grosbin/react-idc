import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { actionAuth } from "../../actions/actionAuth";
import { useNavigate } from "react-router-dom";

interface defaultValues {
  email: string;
}

type FormLoginProps = "email";

export const FormAddUser = () => {
  const navigate = useNavigate();
  const { startAddUserAdmin } = actionAuth();
  const defaultValues: defaultValues = {
    email: "",
  };

  const [showMessage, setShowMessage] = useState(false);
  //   const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {}, []); //

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data: defaultValues) => {
    // setFormData(data);
    setShowMessage(true);
    startAddUserAdmin(data.email);
    reset();
  };

  const getFormErrorMessage = (name: FormLoginProps) => {
    return (
      errors[name] && <small className="p-error">{errors[name]?.message}</small>
    );
  };

  const navigateHome = () => {
    setShowMessage(false);
    navigate("/");
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={navigateHome}
      />
    </div>
  );
  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
      >
        <div className="flex justify-content-center align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h2>Usuario Administrador Agregado</h2>
          {/* <h4>
            Puede revisar la bandeja de entrada de su correo para completar los
            pasos{" "}
          </h4>
          <p style={{ color: "var(--yellow-200)" }}>
            Si no aparece en la bandeja de entrada, puede revisar si se
            encuentra en SPAM.
          </p> */}
        </div>
      </Dialog>

      <div className="justify-content-center">
        <div className="card">
          {/* <h5 className="text-center">Register</h5> */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "El correo es requerido.",
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="email"
                  className={classNames({ "p-error": !!errors.email })}
                >
                  Correo*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>

            <Button label="Agregar" />
          </form>
        </div>
      </div>
    </div>
  );
};
