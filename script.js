/* ===== Configuración del negocio ===== */
const CONFIG = {
  nombre: "Laguna Milk",
  portadaTitulo: "Quesos Laguna Milk",
  portadaFrase: "Sabor, calidad y tradición en cada bocado.",
  whatsapp: "5218711128651",
  telefono: "5218711128651",
  mensajePedido: "Hola, quiero conocer sus quesos y hacer un pedido."
};

/* ===== Sección «Nosotros» — TEXTO PROVISIONAL: reemplázalo por su historia real ===== */
const NOSOTROS = {
  titulo: "Nuestra historia, hecha queso.",
  parrafos: [
    "Aquí cuentan cómo empezó la quesería: quién la fundó, en qué lugar y por qué decidieron dedicarse a hacer queso.",
    "Cuenten qué los distingue: la leche que usan, las recetas de la familia y el cuidado con el que trabajan cada barra.",
    "Cierren con lo que quieren que sientan sus clientes cuando el queso llegue a su mesa."
  ],
  hitos: [
    { t: "Leche fresca", d: "Describan de dónde viene su leche y cómo la reciben." },
    { t: "Cuajado y prensado", d: "Expliquen cómo trabajan el queso a mano." },
    { t: "Reposo y entrega", d: "Cuenten cómo cuidan cada barra hasta que llega al cliente." }
  ],
  imagenes: ["imagenes/nosotros-panela-r.jpg", "imagenes/nosotros-mozzarella-r.jpg", "imagenes/nosotros-asadero-r.jpg"]  // Cambia por fotos de tu quesería cuando las tengas
};

/* Cada queso: su foto está en "imagen" (carpeta imagenes/). Opcional: insignia: "Más vendido". */
const PRODUCTOS = [
  { id: 1, nombre: "Queso Chihuahua", categoria: "Chihuahua", descripcion: "Suave, cremoso y fácil de fundir. Ideal para quesadillas, gratinados, sincronizadas y para disfrutar en familia.", presentacion: "Barra chica 1.4 kg · grande 2.5 kg", precio: 0, imagen: "imagenes/chihuahua.jpg", insignia: "", tipo: "chihuahua" },
  { id: 2, nombre: "Queso Mozzarella", categoria: "Mozzarella", descripcion: "De textura tierna y gran fundido. El favorito para pizzas, pastas, lasañas y platillos al horno.", presentacion: "Barra chica 1.4 kg · grande 2.5 kg", precio: 0, imagen: "imagenes/mozzarella.jpg", insignia: "", tipo: "mozzarella" },
  { id: 3, nombre: "Queso Panela", categoria: "Panela", descripcion: "Fresco, ligero y de sabor delicado. Disfrútalo en ensaladas, a la plancha o como parte de tus comidas de todos los días.", presentacion: "Barra chica 1.4 kg · grande 2.5 kg", precio: 0, imagen: "imagenes/panela.jpg", insignia: "", tipo: "panela" },
  { id: 4, nombre: "Queso Asadero", categoria: "Asadero", descripcion: "Tradicional, elástico y delicioso al fundirse. Perfecto para quesadillas, alambres, nachos y antojitos.", presentacion: "Barra chica 1.4 kg · grande 2.5 kg", precio: 0, imagen: "imagenes/asadero.jpg", insignia: "", tipo: "asadero" }
];

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const msgProducto = (p, t = "chica") => `Hola, me interesa el ${p.nombre} en barra ${t} (${t === "chica" ? "1.4 kg" : "2.5 kg"}). ¿Me comparten precio y disponibilidad?`;
const precioTexto = (n) => n > 0 ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n) : "Precio por WhatsApp";
const fotoHTML = (p) => p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" loading="lazy" onerror="this.remove()">` : "";
const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const leer = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };

/* textos y enlaces */
document.querySelectorAll("[data-cfg]").forEach((el) => { el.textContent = CONFIG[el.dataset.cfg]; });
document.querySelectorAll("[data-wa]").forEach((a) => { a.href = waLink(CONFIG.mensajePedido); a.target = "_blank"; a.rel = "noopener"; });
document.querySelectorAll("[data-tel]").forEach((a) => { const n = CONFIG.telefono.replace(/\D/g, ""); a.href = "tel:+" + n; a.textContent = "+" + n; });
$("year").textContent = new Date().getFullYear();

/* menú lateral (celular/tablet) + sección activa */
const burger = $("hamburguesa"), menu = $("menu"), fondoMenu = $("menuFondo"), cerrarMenuBtn = $("menuCerrar");
const bloquear = () => document.body.classList.toggle("bloqueado", menu.classList.contains("abierto") || $("modal").classList.contains("abierto"));
function toggleMenu(abrir) {
  const estabaAbierto = menu.classList.contains("abierto");
  menu.classList.toggle("abierto", abrir); fondoMenu.classList.toggle("abierto", abrir);
  burger.setAttribute("aria-expanded", abrir); burger.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
  bloquear();
  if (abrir) cerrarMenuBtn.focus({ preventScroll: true });
  else if (estabaAbierto) burger.focus({ preventScroll: true });
}
burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("abierto")));
cerrarMenuBtn.addEventListener("click", () => toggleMenu(false));
fondoMenu.addEventListener("click", () => toggleMenu(false));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
window.matchMedia("(min-width: 1021px)").addEventListener("change", (e) => { if (e.matches) toggleMenu(false); });
const enlaces = [...menu.querySelectorAll("a[data-sec]")];
const obs = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) enlaces.forEach((a) => a.classList.toggle("activo", a.dataset.sec === e.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
["inicio", "quesos", "nosotros", "contacto"].forEach((id) => obs.observe($(id)));

/* nosotros */
$("titulo-nosotros").textContent = NOSOTROS.titulo;
$("nosotrosTexto").innerHTML = NOSOTROS.parrafos.map((t) => `<p>${esc(t)}</p>`).join("");
$("hitos").innerHTML = NOSOTROS.hitos.map((h) => `<li><h3>${esc(h.t)}</h3><p>${esc(h.d)}</p></li>`).join("");
$("nosotrosFotos").innerHTML = NOSOTROS.imagenes.map((src, i) => src
  ? `<div class="espacio con-foto"><img src="${esc(src)}" alt="Queso Laguna Milk, foto ${i + 1}" loading="lazy" onerror="this.remove()"></div>`
  : `<div class="espacio">Espacio para foto ${i + 1}</div>`).join("");

/* catálogo: búsqueda, orden, vista y favoritos */
const catalogo = $("catalogo"), vacio = $("vacio"), conteo = $("conteo");
let busqueda = "", orden = "orden", favs = new Set(leer("favs", []));
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function renderCatalogo() {
  let lista = PRODUCTOS.filter((p) => norm(`${p.nombre} ${p.categoria} ${p.descripcion}`).includes(norm(busqueda)));
  if (orden !== "orden") lista = [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre, "es") * (orden === "az" ? 1 : -1));
  catalogo.innerHTML = ""; vacio.hidden = lista.length > 0;
  conteo.textContent = lista.length ? `Mostrando ${lista.length === 1 ? "1 producto" : `1–${lista.length} de ${PRODUCTOS.length} productos`}` : "Sin resultados";
  lista.forEach((p) => {
    const art = document.createElement("article"); art.className = "tarjeta";
    art.innerHTML = `<div class="foto tarjeta-foto tipo-${esc(p.tipo)}" role="button" tabindex="0" aria-label="Ver detalles de ${esc(p.nombre)}">${fotoHTML(p)}<span class="etiqueta${p.insignia ? " insignia" : ""}">${esc(p.insignia || p.categoria)}</span></div>
      <button class="fav" type="button" aria-pressed="${favs.has(p.id)}" aria-label="Guardar ${esc(p.nombre)} como favorito"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/></svg></button>
      <div class="tarjeta-cuerpo"><h3>${esc(p.nombre)}</h3><p class="desc">${esc(p.descripcion)}</p><div class="tarjeta-pie"><div class="pie-fila"><span class="presentacion">${esc(p.presentacion)}</span><span class="precio consultar">${precioTexto(p.precio)}</span></div>
      <div class="acciones"><button class="btn btn-borde" type="button" data-detalle>Ver detalles</button><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(msgProducto(p))}" aria-label="Pedir ${esc(p.nombre)} por WhatsApp">Pedir</a></div></div></div>`;
    const abrir = art.querySelector("[data-detalle]"), foto = art.querySelector(".tarjeta-foto"), fav = art.querySelector(".fav");
    abrir.addEventListener("click", () => abrirModal(p, abrir)); foto.addEventListener("click", () => abrirModal(p, foto));
    foto.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirModal(p, foto); } });
    fav.addEventListener("click", () => { favs.has(p.id) ? favs.delete(p.id) : favs.add(p.id); fav.setAttribute("aria-pressed", favs.has(p.id)); guardar("favs", [...favs]); });
    catalogo.appendChild(art);
  });
}
document.querySelectorAll(".buscar input").forEach((i) => i.addEventListener("input", () => {
  busqueda = i.value.trim(); document.querySelectorAll(".buscar input").forEach((o) => { if (o !== i) o.value = i.value; });
  renderCatalogo();
}));
$("orden").addEventListener("change", (e) => { orden = e.target.value; renderCatalogo(); });
function vista(lista) { catalogo.classList.toggle("lista", lista); $("vList").setAttribute("aria-pressed", lista); $("vGrid").setAttribute("aria-pressed", !lista); guardar("vista", lista); }
$("vGrid").addEventListener("click", () => vista(false)); $("vList").addEventListener("click", () => vista(true));
vista(leer("vista", false)); renderCatalogo();

/* modal: la foto tiene su propio espacio y el contenido se desplaza dentro del modal */
const modal = $("modal"); let foco, productoActual;
const tamanoActual = () => document.querySelector('input[name="tamano"]:checked').value;
function actualizarLinkModal() { if (productoActual) $("modalWa").href = waLink(msgProducto(productoActual, tamanoActual())); }
function abrirModal(p, origen) {
  foco = origen; productoActual = p; const foto = $("modalFoto");
  foto.className = `foto tipo-${p.tipo}`; foto.innerHTML = fotoHTML(p);
  $("modalCategoria").textContent = p.categoria; $("modalNombre").textContent = p.nombre; $("modalDesc").textContent = p.descripcion;
  $("modalPrecio").textContent = p.precio > 0 ? precioTexto(p.precio) : "Precio a consultar por WhatsApp";
  $("modalFicha").innerHTML = `<dt>Presentaciones</dt><dd>Barra chica de 1.4 kg o grande de 2.5 kg</dd><dt>Ideal para</dt><dd>${esc(p.descripcion.split(".")[0].toLowerCase())}</dd>`;
  document.querySelector('input[name="tamano"][value="chica"]').checked = true; actualizarLinkModal();
  modal.scrollTop = 0; modal.classList.add("abierto"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("bloqueado"); $("cerrarModal").focus({ preventScroll: true });
}
function cerrarModal() { modal.classList.remove("abierto"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("bloqueado"); if (foco) foco.focus({ preventScroll: true }); }
document.querySelectorAll('input[name="tamano"]').forEach((r) => r.addEventListener("change", actualizarLinkModal));
$("cerrarModal").addEventListener("click", cerrarModal); $("cerrarX").addEventListener("click", cerrarModal);
modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { toggleMenu(false); if (modal.classList.contains("abierto")) cerrarModal(); return; }
  if (e.key === "Tab" && menu.classList.contains("abierto")) {
    const m = [...menu.querySelectorAll("a[href], button")], pm = m[0], um = m[m.length - 1];
    if (e.shiftKey && document.activeElement === pm) { e.preventDefault(); um.focus(); } else if (!e.shiftKey && document.activeElement === um) { e.preventDefault(); pm.focus(); }
    return;
  }
  if (!modal.classList.contains("abierto") || e.key !== "Tab") return;
  const items = [...modal.querySelectorAll("a[href], button, input")], primero = items[0], ultimo = items[items.length - 1];
  if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); } else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
});
