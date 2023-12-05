document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("cursoNombre")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Evitar que el formulario se envíe por defecto

      const userInput = document.getElementById("nombreCurso").value;
      const errorLabel = document.getElementById("error");
      // Construir la URL con el valor ingresado por el usuario
      const url = `http://localhost:3000/curso/nombre/${encodeURIComponent(
        userInput
      )}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }

        const data = await response.json();
        const cursoData = data; // Los datos obtenidos de la API
        console.log(data);
    
        const cursoBody = document.getElementById("resultadoTabla");
        const row = document.createElement("tr");

        cursoBody.innerHTML = "";
        
        if(cursoData.length === 0) {
          errorLabel.textContent = "No se encontro ningun curso con el nombre indicado"
        } else {
          errorLabel.textContent = "";
        }
        row.innerHTML = `
          <td>${cursoData[0]._id}</td>
          <td>${cursoData[0].codigo}</td>
          <td>${cursoData[0].nombre}</td>
          <td>${cursoData[0].creditos}</td>
          <td>${cursoData[0].horas_semanales}</td>
        `;
        cursoBody.appendChild(row);

        // const cursosBody = document.getElementById("cursosBody");
        // carreraData.cursos.forEach((curso) => {
        //   const cursoRow = document.createElement("tr");
        //   cursoRow.innerHTML = `
        //     <td>${curso.codigo}</td>
        //     <td>${curso.año}</td>
        //     <td>${curso.ciclo}</td>
        //   `;
        //   cursosBody.appendChild(cursoRow);
        // });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    });
});