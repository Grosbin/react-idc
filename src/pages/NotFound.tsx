export const NotFound = () => {
  const img = (
    <img
      style={{ width: 100, paddingTop: 20 }}
      alt="Iglesia de Cristo"
      src="logo/Logo_Blanco.png"
    />
  );

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
      <h1>Felicidades ha encontrado una pagina que no existe :)</h1>
    </div>
  );
};
