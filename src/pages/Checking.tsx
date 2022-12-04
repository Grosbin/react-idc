import { ProgressSpinner } from "primereact/progressspinner";

export const Checking = () => {
  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#040d19",
      }}
    >
      <ProgressSpinner strokeWidth="2" />
    </div>
  );
};
