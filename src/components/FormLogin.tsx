import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { actionAuth } from "../actions/actionAuth";

interface defaultValues {
  email: string;
  password: string;
}

type FormLoginProps = "email" | "password";

export const FormLogin = () => {
  const { startLogin } = actionAuth();
  const defaultValues: defaultValues = {
    email: "",
    password: "",
  };

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {}, []); //

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data: defaultValues) => {
    setFormData(data);
    setShowMessage(true);
    console.log(data);
    startLogin(data.email, data.password);
    // reset();
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
                      // value={isStudent ? 'grosbin.rivera@unah.hn' : 'grosbin.rivera@unah.edu.hn'}
                      // value={isStudent ? 'grosbin.rivera@unah.hn' : 'grosbin.rivera@unah.edu.hn'}
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
                      feedback={
                        false
                      } /*value={isStudent ? '12345678' : '12345678'}*/
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

            <Button label="Entrar" />
          </form>
        </div>
      </div>
    </div>
  );
};
