document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("carreraNombre").addEventListener("submit", async function (event) {
      event.preventDefault(); // Evitar que el formulario se envíe por defecto
  
      const userInput = document.getElementById("codigoCurso").value;
      const errorLabel = document.getElementById("error");
  
      // Construir la URL con el valor ingresado por el usuario
      const url = `http://localhost:3000/carrera/codigo/${encodeURIComponent(userInput)}`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
  
        const data = await response.json();
        const carreraData = data;
  console.log(carreraData);
        const carreraBody = document.getElementById("carreraBody");
        const cursosBody = document.getElementById("cursosBody");
  
        // Limpiar tablas previas
        carreraBody.innerHTML = "";
        cursosBody.innerHTML = "";
  
        if (carreraData.length === 0) {
          errorLabel.textContent = "No se encontró ninguna carrera con ese codigo.";
        } else {
          errorLabel.textContent = ""; // Limpiar mensaje de error si hay resultados
  
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${carreraData._id}</td>
            <td>${carreraData.codigo}</td>
            <td>${carreraData.nombre}</td>
            <td>${carreraData.titulo}</td>
          `;
          carreraBody.appendChild(row);
  
          carreraData.cursos.forEach((curso) => {
            const cursoRow = document.createElement("tr");
            cursoRow.innerHTML = `
              <td>${curso._id}</td>
              <td>${curso.codigo}</td>
              <td>${curso.año}</td>
              <td>${curso.ciclo}</td>
            `;
            cursosBody.appendChild(cursoRow);
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        errorLabel.textContent = "Ocurrió un error al procesar la solicitud.";
      }
    });
  });
  