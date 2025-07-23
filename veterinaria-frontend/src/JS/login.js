document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuarioIngresado = form.querySelectorAll(".input-field")[0].value.trim();
    const contraseñaIngresada = form.querySelectorAll(".input-field")[1].value;

    if (!usuarioIngresado || !contraseñaIngresada) {
      alert("Por favor, completá ambos campos.");
      return;
    }

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (!usuarioGuardado) {
      alert("No hay usuarios registrados. Por favor, registrate primero.");
      return;
    }

    if (
      usuarioIngresado === usuarioGuardado.usuario &&
      contraseñaIngresada === usuarioGuardado.contraseña
    ) {
      //alert("Inicio de sesión exitoso.");
      // Redirigir a la página principal del sistema
      // window.location.href = "panel.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });
});
