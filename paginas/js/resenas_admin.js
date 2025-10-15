function cargarResenasAdmin() {
    fetch("http://localhost/pclouds/backend/get_resena_admin.php")
        .then(response => {
            console.log("Estado de respuesta:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data);
            const tbody = document.querySelector(".admin-table tbody");
            
            if (!tbody) {
                console.error("No se encontró el tbody de la tabla");
                return;
            }
            
            tbody.innerHTML = "";
            
            if (!Array.isArray(data) || data.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6' class='text-center'>No hay reseñas disponibles.</td></tr>";
                return;
            }
            
            data.forEach((resena) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>
                        <input type="text" class="form-control" id="name-${resena.id}" value="${resena.name || 'Anónimo'}">
                    </td>
                    <td>
                        <textarea class="form-control" id="content-${resena.id}" rows="2">${resena.content}</textarea>
                    </td>
                    <td>${new Date(resena.created_at).toLocaleDateString('es-ES')}</td>
                    <td>
                        <select class="form-select form-select-custom" style="width: 120px;" id="visible-${resena.id}">
                            <option value="1" ${resena.visible == 1 ? 'selected' : ''}>Sí</option>
                            <option value="0" ${resena.visible == 0 ? 'selected' : ''}>No</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn-guardar" onclick="updateReview(${resena.id})">
                            Guardar
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-eliminar" onclick="eliminarResena(${resena.id})">
                            Eliminar
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            
            console.log("Reseñas cargadas exitosamente:", data.length);
        })
        .catch(error => {
            console.error('Error al cargar reseñas:', error);
            const tbody = document.querySelector(".admin-table tbody");
            if (tbody) {
                tbody.innerHTML = "<tr><td colspan='6' class='text-center text-danger'>Error al cargar las reseñas. Revisa la consola.</td></tr>";
            }
        });
}

async function updateReview(id) {
    // ✅ Corregido: usar comillas invertidas para template literals
    const name = document.getElementById(`name-${id}`).value;
    const content = document.getElementById(`content-${id}`).value;
    const visible = document.getElementById(`visible-${id}`).value;

    console.log("Actualizando reseña:", { id, name, content, visible });

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("content", content);
    formData.append("visible", visible);

    try {
        const response = await fetch("http://localhost/pclouds/backend/guardar_resena_admin.php", {
            method: "POST",
            body: formData
        });

        console.log("Respuesta del servidor:", response.status);
        const result = await response.json();
        console.log("Resultado:", result);

        if (result.status === "success") {
            alert("Reseña actualizada correctamente.");
            cargarResenasAdmin(); // Recargar tabla
        } else {
            alert("Error al actualizar: " + (result.message || "Error desconocido"));
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Error de conexión al actualizar la reseña");
    }

    cargarResenasAdmin(); //recargar
}

window.onload = cargarResenasAdmin;