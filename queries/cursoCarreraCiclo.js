document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("cursoCarreraCiclo")
      .addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe por defecto
  
        const userInput = document.getElementById("codigoCarrera").value;
        const userInput2 = document.getElementById("ciclo").value;
        const errorLabel = document.getElementById("error");
  
        const url = `http://localhost:3000/carrera/codigo/${encodeURIComponent(userInput)}/ciclo/${encodeURIComponent(userInput2)}`;
  
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
          }
  
          const data = await response.json();
          const cursoData = data; // Los datos obtenidos de la API
          console.log(data);
  
          const cursoBody = document.getElementById("resultadoTabla");
          cursoBody.innerHTML = ""; // Limpiar contenido existente
  
          if (cursoData.length === 0) {
            errorLabel.textContent = "No se encontró ningún curso con el nombre indicado";
          } else {
            errorLabel.textContent = "";
  
            // Inicializar el contador
            let contador = 1;
  
            cursoData.forEach((curso) => {
              const row = document.createElement("tr");
              row.innerHTML = `
                <td>${contador}</td>
                <td>${curso.codigo}</td>
                <td>${curso.año}</td>
                <td>${curso.ciclo}</td>
              `;
              cursoBody.appendChild(row);
  
              // Incrementar el contador para la próxima fila
              contador++;
            });
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      });
  });
  