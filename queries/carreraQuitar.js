document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("quitarCarrera")
      .addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe por defecto
  
        const userInput = document.getElementById("codigoCarrera").value;
        const userInput2 = document.getElementById("codigoCurso").value;
        const errorLabel = document.getElementById("error");
  
        const url = `http://localhost:3000/carrera/codigo/${encodeURIComponent(userInput)}/quitar-curso/${encodeURIComponent(userInput2)}`;
  
        try {
            const response = await fetch(url, { method: 'DELETE' });

          if (!response.ok) {
            errorLabel.textContent = "El curso no se encuentra en la carrera.";
            throw new Error("La solicitud no fue exitosa");
          } else {
            errorLabel.textContent = "El curso fue borrado exitosamente";
          }
  
          
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      });
  });
  