document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que se envíe el formulario

    // Capturar los valores
    const nombreCompleto = form.querySelectorAll(".input-field")[0].value.trim();
    const correo = form.querySelectorAll(".input-field")[1].value.trim();
    const usuario = form.querySelectorAll(".input-field")[2].value.trim();
    const contraseña = form.querySelectorAll(".input-field")[3].value;
    const confirmarContraseña = form.querySelectorAll(".input-field")[4].value;

    // Validaciones
    if (!nombreCompleto || !correo || !usuario || !contraseña || !confirmarContraseña) {
      alert("Por favor, completá todos los campos.");
      return;
    }

    if (!validarEmail(correo)) {
      alert("Ingresá un correo electrónico válido.");
      return;
    }

    if (contraseña.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }

   // Si todo está bien
    const usuarioData = {
      nombreCompleto,
      correo,
      usuario,
      contraseña
    };

    // Guardamos en localStorage
    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuarioData));

    alert("¡Registro exitoso!");
    window.location.href = "index.html";
   
  });

  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
