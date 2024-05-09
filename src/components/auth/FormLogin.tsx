import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { actionAuth } from "../../actions/actionAuth";

interface defaultValues {
  email: string;
  password: string;
}

type FormLoginProps = "email" | "password";

export const FormLogin = () => {
  const { startLogin, startGetUser } = actionAuth();
  const defaultValues: defaultValues = {
    email: "",
    password: "",
  };

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  // const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {}, []); //

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data: defaultValues) => {
    setLoadingLogin(true);
    const validate = await startGetUser(data.email);

    if (validate) {
      // setFormData(data);
      startLogin(data.email, data.password);
    } else {
      console.log("usuario no encontrado");
      setShowMessage(true);
    }
    setLoadingLogin(false);
    reset();
  };

  const getFormErrorMessage = (name: FormLoginProps) => {
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
            className="pi pi-lock"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h2>No tiene permisos de Administrador</h2>
        </div>
      </Dialog>

      <div className="justify-content-center">
        <div style={{ width: "100%" }}>
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

            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "La contraseña es requerida." }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      feedback={false}
                    />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ "p-error": errors.password })}
                >
                  Contraseña*
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>

            <Button label="Entrar" loading={loadingLogin} />
          </form>
        </div>
      </div>
    </div>
  );
};
