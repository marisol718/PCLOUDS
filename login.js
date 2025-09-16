document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost/proyecto_pia/PCLOUDS/backend/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    console.log("hola",data);
    
    document.getElementById("mensaje").innerText = data.message;

    if (data.success) {
      window.location.href = "admin.html";
      document.getElementById("mensaje").style.color = "green";
    } else {
      document.getElementById("mensaje").style.color = "red";
    }
  } catch (error) {
    document.getElementById("mensaje").innerText = "Error de conexión con el servidor.";
    document.getElementById("mensaje").style.color = "red";
  }
});