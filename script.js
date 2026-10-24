/* =========================================================
   URBAN BARBER · JavaScript
   ========================================================= */

/* ---------------------------------------------------------
   1. CONFIGURACIÓN: AQUÍ CAMBIAS EL NÚMERO DE WHATSAPP
   ---------------------------------------------------------
   Formato: código del país + número, SIN espacios, SIN "+" y SIN guiones.
   Ejemplo para Colombia (57) con el celular 3001234567:  "573001234567"
   El número de abajo es FALSO (de ejemplo). Reemplázalo por el tuyo
   solo cuando quieras probar con un número real.
*/
const WHATSAPP_NUMBER = "573000000000";

/* ---------------------------------------------------------
   2. ENLACES DE WHATSAPP
   Todos los elementos con el atributo data-whatsapp reciben
   un enlace https://wa.me/NUMERO?text=MENSAJE
   --------------------------------------------------------- */
const whatsappLinks = document.querySelectorAll("[data-whatsapp]");

whatsappLinks.forEach(function (link) {
  const message = link.dataset.message || "Hola, quiero información de Urban Barber.";
  link.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  link.target = "_blank";                 // se abre en una pestaña nueva
  link.rel = "noopener noreferrer";       // buena práctica de seguridad
});

/* ---------------------------------------------------------
   3. MENÚ PARA MÓVILES (botón hamburguesa)
   --------------------------------------------------------- */
const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");

function setMenu(open) {
  header.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

navToggle.addEventListener("click", function () {
  setMenu(!header.classList.contains("nav-open"));
});

// Al tocar un enlace del menú, se cierra
nav.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () { setMenu(false); });
});

// Con la tecla Escape también se cierra
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") setMenu(false);
});

/* ---------------------------------------------------------
   4. ENCABEZADO: cambia de aspecto al bajar la página
   --------------------------------------------------------- */
function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 30);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* ---------------------------------------------------------
   5. ANIMACIÓN SUAVE AL APARECER LAS SECCIONES
   --------------------------------------------------------- */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);   // solo se anima una vez
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(function (item) { observer.observe(item); });
} else {
  // Navegador muy antiguo: se muestra todo sin animar
  revealItems.forEach(function (item) { item.classList.add("is-visible"); });
}

/* ---------------------------------------------------------
   6. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
   --------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
