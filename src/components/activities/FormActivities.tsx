import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { actionActivity } from "../../actions/actionActivity";
import moment from "moment";
import "moment/dist/locale/es";
moment.locale("es");
interface defaultValues {
  title: { activityTitle: string };
  description: string;
  day: Date | undefined;
  hour: Date | undefined;
}

type FormPrayersProps = "title" | "description" | "day" | "hour";

const defaultValuesData: defaultValues = {
  title: { activityTitle: "" },
  description: "",
  day: undefined,
  hour: undefined,
};

const fieldActivityTitle = [
  { activityTitle: "Culto Dom." },
  { activityTitle: "Clase Bíblica" },
  { activityTitle: "Reu. de Damas" },
  { activityTitle: "Reu. de Jóvenes" },
];

addLocale("es", {
  firstDayOfWeek: 1,
  dayNames: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ],
  dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  dayNamesMin: ["D", "L", "M", "MI", "J", "V", "S"],
  monthNames: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
  monthNamesShort: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ],
  today: "Hoy",
  clear: "Claro",
});

export const FormActivities = () => {
  const [formData, setFormData] = useState<defaultValues>({} as defaultValues);
  const [selectTitleActivity, setSelectTitleActivity] = useState<
    { activityTitle: string }[]
  >([]);
  const { startAddActivity } = actionActivity();
  const {
    getValues,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: formData });

  useEffect(() => {
    setSelectTitleActivity(fieldActivityTitle);
    setFormData(defaultValuesData);
  }, []);

  const getFormErrorMessage = (name: FormPrayersProps) => {
    return (
      errors[name] && <small className="p-error">{errors[name]?.message}</small>
    );
  };
  const onSubmit = (data: defaultValues) => {
    setFormData(data);
    const activity = transformData(data);
    startAddActivity(activity);

    clearForm();
  };

  const transformData = (data: defaultValues) => {
    const day = moment(data.day)
      .format("dddd D MMM")
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1)
      );

    const hour = moment(data.hour).format("hh:mm A");
    const date = data.day?.toDateString();
    const title = data.title.activityTitle ?? data.title;
    const description = data.description ?? "";

    return {
      title,
      description,
      day,
      hour,
      date,
    };
  };

  const clearForm = () => {
    setFormData(defaultValuesData);
    reset();
  };
  return (
    <div className="" style={{ marginTop: 30 }}>
      <div className="">
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field" style={{ marginBottom: 25 }}>
              <span className="p-float-label">
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: true,
                    maxLength: {
                      value: 15,
                      message:
                        "El titulo es muy largo, por favor ingrese menos de 15 caracteres",
                    },
                  }}
                  render={({ field }) => {
                    let value: string | { activityTitle: string } =
                      field.value ?? formData.title;

                    if (value?.activityTitle === "") {
                      value = "";
                    }
                    return (
                      <Dropdown
                        value={value}
                        onChange={(e) => field.onChange(e.value)}
                        options={selectTitleActivity}
                        optionLabel="activityTitle"
                        editable
                      />
                    );
                  }}
                />

                <label
                  htmlFor="activityTitle"
                  className={classNames({ "p-error": errors.title })}
                >
                  Titulo*
                </label>
              </span>

              {getFormErrorMessage("title")}
            </div>

            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="day"
                  control={control}
                  rules={{ required: "La fecha es requerida." }}
                  render={({ field, fieldState }) => {
                    let value = field.value ?? formData.day;

                    return (
                      <Calendar
                        touchUI
                        dateFormat="dd/mm/yy"
                        locale="es"
                        value={value}
                        onChange={(e) => field.onChange(e.value)}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        showIcon={true}
                        minDate={new Date()}
                      ></Calendar>
                    );
                  }}
                />
                <label
                  htmlFor="day"
                  className={classNames({ "p-error": errors.day })}
                >
                  Dia*
                </label>
              </span>
              {getFormErrorMessage("day")}
            </div>

            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="hour"
                  control={control}
                  rules={{ required: "La hora es requerida." }}
                  render={({ field, fieldState }) => {
                    let value = field.value ?? formData.hour;
                    return (
                      <Calendar
                        touchUI
                        timeOnly
                        hourFormat="12"
                        value={value}
                        onChange={(e) => field.onChange(e.value)}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        showIcon={true}
                        icon="pi pi-clock"
                      ></Calendar>
                    );
                  }}
                />
                <label
                  htmlFor="hour"
                  className={classNames({ "p-error": errors.hour })}
                >
                  Hora*
                </label>
              </span>
              {getFormErrorMessage("hour")}
            </div>

            <div className="field">
              <span className="p-float-label" style={{ marginTop: 10 }}>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: false,
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
                  Descripción (opcional)
                </label>
              </span>
              {getFormErrorMessage("description")}
            </div>

            <div className="flex gap-5">
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
          </form>
        </div>
      </div>
    </div>
  );
};
