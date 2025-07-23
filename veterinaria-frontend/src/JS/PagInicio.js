let currentSection = "";

function abrirModal(seccion) {
  currentSection = seccion;
  document.getElementById("modal").style.display = "flex";
  document.getElementById("fecha").value = "";
  document.getElementById("descripcion").value = "";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function guardarEntrada() {
  const fecha = document.getElementById("fecha").value;
  const desc = document.getElementById("descripcion").value.trim();

  if (fecha && desc) {
    const nuevoItem = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = fecha;
    nuevoItem.appendChild(span);
    nuevoItem.append(` ${desc}`);

    const lista = document.getElementById(`${currentSection}-list`);
    lista.appendChild(nuevoItem);
    cerrarModal();
  } else {
    alert("Por favor, complete ambos campos.");
  }
}
