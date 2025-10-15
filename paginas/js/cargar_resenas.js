function cargarResenas() {
    fetch("http://localhost/PCLOUDS/backend/get_reviews.php")
        .then(response => {
            console.log("Estado de respuesta:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data);
            const container = document.getElementById("resenas");
            
            if (!container) {
                console.error("No se encontró el contenedor 'resenas'");
                return;
            }
            
            container.innerHTML = "";
            
            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = '<div class="text-center text-muted">No hay reseñas disponibles.</div>';
                return;
            }
            
            data.forEach(resena => {
                const div = document.createElement("div");
                div.className = "review-card mb-3 p-3 border rounded bg-white shadow-sm";
                div.innerHTML = `
                    <h5 class="mb-2">${resena.name}</h5>
                    <p class="mb-2">${resena.content}</p>
                    <small class="text-muted">${new Date(resena.created_at).toLocaleDateString('es-ES')}</small>
                `;
                container.appendChild(div);
            });
            
            console.log("Reseñas cargadas exitosamente:", data.length);
        })
        .catch(err => {
            console.error("Error al cargar reseñas:", err);
            const container = document.getElementById("resenas");
            if (container) {
                container.innerHTML = '<div class="text-center text-danger">Error al cargar reseñas. Revisa la consola.</div>';
            }
        });
}

window.onload = cargarResenas;