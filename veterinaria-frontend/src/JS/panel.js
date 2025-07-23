document.addEventListener("DOMContentLoaded", function () {
  const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado"));
  if (!usuario) {
    alert("No estás logueado. Redirigiendo...");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("nombreCompleto").textContent = usuario.nombreCompleto;
  document.getElementById("correo").textContent = usuario.correo;
  document.getElementById("usuario").textContent = usuario.usuario;

  document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioRegistrado");
    window.location.href = "index.html";
  });

  const formTarea = document.getElementById("form-tarea");
  const tareas = JSON.parse(localStorage.getItem("tareas_" + usuario.usuario)) || [];

  function renderTareas() {
    ["turno", "vacuna", "peluqueria"].forEach(tipo => {
      document.getElementById(`${tipo}-list`).innerHTML = "";
    });

    tareas.forEach((tarea, i) => {
      const li = document.createElement("li");
      li.className = tarea.hecha ? "tarea hecha" : "tarea";
      li.innerHTML = `
        ${tarea.titulo} - ${tarea.fecha}
        <div class="botones-tarea">
          <button class="btn-hecha">✓</button>
          <button class="btn-borrar">🗑</button>
        </div>
      `;

      li.querySelector(".btn-hecha").addEventListener("click", () => {
        tareas[i].hecha = !tareas[i].hecha;
        guardarYRender();
      });

      li.querySelector(".btn-borrar").addEventListener("click", () => {
        if (confirm("¿Eliminar esta tarea?")) {
          tareas.splice(i, 1);
          guardarYRender();
        }
      });

      document.getElementById(`${tarea.tipo}-list`).appendChild(li);
    });
  }

  function guardarYRender() {
    localStorage.setItem("tareas_" + usuario.usuario, JSON.stringify(tareas));
    renderTareas();
  }

  formTarea.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("tituloTarea").value.trim();
    const fecha = document.getElementById("fechaTarea").value;
    const tipo = document.getElementById("tipoTarea").value;

    if (!titulo || !fecha || !tipo) return alert("Completa todos los campos");

    tareas.push({ titulo, fecha, tipo, hecha: false });
    guardarYRender();
    formTarea.reset();
  });

  renderTareas();
});
