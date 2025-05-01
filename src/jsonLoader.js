// === Listener para carga de laberinto JSON ===
const jsonInput = document.getElementById("jsonInput");

jsonInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      console.log("JSON cargado:", json);
      // Aquí puedes llamar a tu lógica para construir el laberinto
    } catch (err) {
      console.error("Error al parsear el archivo JSON:", err);
    }
  };

  reader.readAsText(file);
});
