/* ============================================================
   EFECTO SUAVE DE ENTRADA
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".hero, .subhero, .contenido");

  sections.forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transition = "opacity 1s ease";
  });

  setTimeout(() => {
    sections.forEach(sec => sec.style.opacity = "1");
  }, 200);
});

/* ============================================================
   SISTEMA DE MODALES PRESENTACIÓN – UNIVERSAL
   ============================================================ */

let modalActivo = null;

function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  const secciones = modal.querySelectorAll(".modal-seccion");

  modal.style.display = "flex";
  modalActivo = modal;

  // Reset secciones
  secciones.forEach(sec => {
    sec.style.display = "none";
    sec.style.opacity = "0";
  });

  modal.dataset.index = 0;
  mostrarSeccion(modal, 0);

  // Limpiar listeners previos
  modal.onclick = null;

  // Clic para avanzar
  modal.addEventListener("click", avanzarHandler);
}

function avanzarHandler(e) {
  if (!modalActivo) return;

  // Si clic dentro del contenido, no avanzar
  if (e.target.closest(".modal-content")) return;

  avanzarSeccion(modalActivo);
}

function mostrarSeccion(modal, index) {
  const secciones = modal.querySelectorAll(".modal-seccion");
  const sec = secciones[index];

  if (!sec) return;

  sec.style.display = "block";
  setTimeout(() => sec.style.opacity = "1", 20);

  actualizarProgreso(modal);
}

function avanzarSeccion(modal) {
  const secciones = modal.querySelectorAll(".modal-seccion");
  let index = parseInt(modal.dataset.index || "0", 10);
  const next = index + 1;

  if (next < secciones.length) {
    modal.dataset.index = next;
    mostrarSeccion(modal, next);
  } else {
    cerrarModal(modal.id);
  }
}

function actualizarProgreso(modal) {
  const total = modal.querySelectorAll(".modal-seccion").length;
  const actual = parseInt(modal.dataset.index || "0", 10) + 1;

  const barra = modal.querySelector(".modal-progress-bar");
  const texto = modal.querySelector(".modal-progress-text");

  if (barra) barra.style.setProperty("--progress", (actual / total) * 100 + "%");
  if (texto) texto.textContent = `${actual} / ${total}`;
}

function cerrarModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.style.display = "none";
  modal.removeEventListener("click", avanzarHandler);
  modalActivo = null;
}

/* ============================================================
   FILTRO POR PERFIL
   ============================================================ */
const selectPerfil = document.getElementById("filtroPerfil");
const cards = document.querySelectorAll(".card-pro");

if (selectPerfil) {
  selectPerfil.addEventListener("change", () => {
    const filtro = selectPerfil.value;

    cards.forEach(card => {
      const perfiles = (card.dataset.perfil || "").split(" ");

      if (filtro === "todos" || perfiles.includes(filtro)) {
        card.style.display = "block";
        setTimeout(() => (card.style.opacity = "1"), 50);
      } else {
        card.style.opacity = "0";
        setTimeout(() => (card.style.display = "none"), 200);
      }
    });
  });
}
function abrirModal(id){
  document.getElementById(id).style.display = "flex";
}

function cerrarModal(id){
  document.getElementById(id).style.display = "none";
}
