document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("carreraNombre").addEventListener("submit", async function (event) {
        event.preventDefault();
        const codigoCarrera = document.getElementById("codigoCarrera").value;

        const codigoCurso = document.getElementById("codigoCurso").value;
        const annioCurso = document.getElementById("annio").value;
        const cicloCurso = document.getElementById("ciclo").value;

        // Datos del formulario
        const formData = {
            codigo: codigoCurso,
            año: annioCurso,
            ciclo: cicloCurso
        };

        // URL de la solicitud
        const url = `http://localhost:3000/carrera/codigo/${codigoCarrera}/agregar-curso`; // Ajusta la URL según tu ruta de creación de curso

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("La solicitud no fue exitosa");
            }

            // En caso de éxito:
            document.getElementById("messageContainer").innerHTML = '<p class="success-message">¡El curso se ha creado exitosamente!</p>';

            // Limpiar el formulario después del éxito
            document.getElementById("codigoCurso").value = "";
            document.getElementById("annio").value = "";
            document.getElementById("ciclo").value = "";

        } catch (error) {
            console.error("Error al crear el curso:", error);
            // En caso de error:
            document.getElementById("messageContainer").innerHTML = '<p class="error-message">Hubo un error al crear el curso. Inténtelo de nuevo.</p>';
        }
    });
});
