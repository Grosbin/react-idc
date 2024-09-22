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
import { addMember } from "../../store/memberSlice";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

interface defaultValues {
  members: Array<{ id: string; name: string }>;
  type: { ambit: string } | null;
}

type FormPrayersProps = "members" | "type";

const defaultValuesData: defaultValues = {
  members: [],
  type: { ambit: "" },
};

const fieldAmbit = [
  { ambit: "Salud" },
  { ambit: "Familias" },
  { ambit: "Seguridad" },
  { ambit: "Fortaleza" },
];

export const FormPrayers = () => {
  const { prayers, onPrayerActive, onCreatePrayer, onUpdatePrayer } =
    useAppSelector(state => state.prayer);
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
  const [membersData, setMembersData] = useState<{ name: string }[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<
    [{ id: string; name: string }] | []
  >([]);
  const [showAddButton, setShowAddButton] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const multiselectRef = useRef(null);

  const accept = () => {
    startAddMember({ name: memberSearch });
    // startLoadingMember();
    // loadingDataMembers();
    setMembersData([...membersData, { name: memberSearch }]);
  };

  const reject = () => {
    console.log("reject");
  };

  useEffect(() => {
    setSelectAmbit(fieldAmbit);
    setFormData(defaultValuesData);
    startLoadingMember();
  }, []); //

  useEffect(() => {
    if (ambit) {
      startOnActiveAmbitPrayer(ambit);
    }

    loadingDataMembers();
  }, [ambit]);

  const loadingDataMembers = () => {
    const membersData = members.map(member => {
      return member;
    });

    setMembersData(membersData);
  };

  const {
    getValues,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: formData });

  const onSubmit = (data: defaultValues) => {
    if (data.type === null || data.members.length === 0) {
      return;
    }
    const prayerWithType = prayers.find(
      prayer => prayer.type === data.type?.ambit
    ) || { id: "", type: "", names: [] };

    let names = combineNames(data.members, prayerWithType.names);

    startUpdatePrayer({ id: prayerWithType.id, type: data.type.ambit, names });

    setSelectedMembers([]);

    console.log("DAta ", data);
    console.log("Ambit", ambit);
    console.log("Selected Members", selectedMembers);
  };

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

    if (member === "") {
      setShowAddButton(false);
    } else {
      setShowAddButton(true);
    }
  };

  const combineNames = (
    array1: Array<{ name: string }>,
    array2: Array<string>
  ) => {
    const names1 = array1.map(object => object.name);
    const names2 = array2;
    const combinedNames = [...names1, ...names2];
    return combinedNames;
  };

  const addMember = () => {
    console.log("Add Member: ", memberSearch);

    if (memberSearch.length < 3) return;

    confirm();
    // startAddMember({ name: memberSearch });
    // startLoadingMember();
    // loadingDataMembers();
    // setMembersData([...membersData, { name: memberSearch }]);
    // console.log("Members", selectedMembers);
  };

  const confirm = () => {
    confirmDialog({
      message: `Esta seguro de agregar el miembro: ${memberSearch}?`,
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      // @ts-ignore
      defaultFocus: "reject",
      acceptLabel: "Si",
      accept,
      reject,
    });
  };
  return (
    <div className="" style={{ marginTop: 0 }}>
      <ConfirmDialog />
      <div className="">
        <div
          className="flex gap-5"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            label="Guardar"
            onClick={() => onSubmit({ type: ambit, members: selectedMembers })}
            className="p-button-primary mb-5 mt-0"
          />
          {/* <Button
            label="Cancelar"
            type="button"
            // icon="pi pi-times"
            className="p-button-secondary"
          /> */}
        </div>
        <div className="card">
          {/* <h5 className="text-center">Register</h5> */}

          <form className="p-fluid" style={{ width: "100%" }}>
            <div
              className="field"
              style={{
                marginBottom: 25,
              }}
            >
              <span className="p-float-label">
                <Controller
                  name="type"
                  control={control}
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

              {/* {getFormErrorMessage("type")} */}
            </div>

            <div
              className="card flex justify-content-center"
              ref={multiselectRef}
              onClick={handleFocus}
              style={{ position: "relative" }}
            >
              <MultiSelect
                value={selectedMembers}
                options={membersData}
                optionLabel="name"
                filter
                placeholder="Miembros"
                emptyFilterMessage="No se encontraron miembros"
                selectedItemsLabel={`${selectedMembers?.length} miembros seleccionados`}
                maxSelectedLabels={3}
                className="w-full"
                onChange={e => {
                  setSelectedMembers(e.value);
                  handleFocus();
                }}
                onFilter={e => {
                  filterMember(e.filter);
                  setMemberSearch(e.filter);
                }}
              />
              {showAddButton && (
                <button
                  className="p-button p-component p-button-raised p-button-primary mt-2"
                  onClick={() => addMember()}
                  type="button"
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
        </div>
      </div>
    </div>
  );
};
