// function cargarResenas() {
//       fetch("http://localhost/reviews/backend/get_reviews.php")
//         .then(response => response.json())
//         .then(data => {
//           const container = document.getElementById("resenas");
//           container.innerHTML = "";

//           if (!Array.isArray(data) || data.length === 0) {
//             container.innerHTML = "<p>No hay reseñas disponibles.</p>";
//             return;
//           }

//           data.forEach(resena => {
//             const div = document.createElement("div");
//             div.className = "review";
//             div.innerHTML = `
//               <strong>${resena.name}</strong><br>
//               <small>${resena.created_at}</small>
//               <p>${resena.content}</p>
//             `;
//             container.appendChild(div);
//           });
//         })
//         .catch(err => {
//           document.getElementById("resenas").innerHTML = "<p>Error al cargar reseñas.</p>";
//         });
//     }

//     window.onload = cargarResenas;