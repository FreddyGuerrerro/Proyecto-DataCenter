'use strict';
/* ===== Configuración =====
   Pega aquí el enlace de inserción del informe publicado en Power BI
   (Archivo > Insertar informe). Si queda vacío se muestran las capturas. */
const POWERBI_EMBED_URL = "";

const $ = (s, r = document) => r.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h) e.innerHTML = h; return e; };
const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
                set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };

/* ===== Datos ===== */
const PAGES = [
  { id: 'aires', name: 'Aires y Temperaturas', v1: 'assets/v1-aires.png', v2: 'assets/v2-aires.png', hu: ['HU-01', 'HU-02'],
    text: 'Temperatura de retorno y suministro, presiones, superheat, horas de compresor y relación de presiones por UMA.',
    measures: ['P_TempRetorno', 'P_TempSumSal', 'Relacion_Presion'], change: 'Pasó de gráfico temporal, gauge y tarjetas a pares gráfico de barras + tabla por variable.' },
  { id: 'potencia', name: 'Potencia y Eléctrico', v1: 'assets/v1-potencia.png', v2: 'assets/v2-potencia.png', hu: ['HU-01', 'HU-02', 'HU-05'],
    text: 'Carga de UPS, KVA, frecuencia, tensión de fase de PDU, balance de corriente por fase, kW de subestación y energía por PDU.',
    measures: ['Pct_Carga_UPS', 'Prom_CorrientePorFase', 'Energia_PDU_Total'], change: 'De 17 a 24 visuales: se agregó el balance por fase y tablas de apoyo.' },
  { id: 'ranking', name: 'Ranking de Alertas', v1: 'assets/v1-ranking.png', v2: 'assets/v2-ranking.png', hu: ['HU-03', 'HU-04', 'HU-05'],
    text: 'Top 5 de equipos con más alertas y lecturas fuera de rango, riesgo de sobrecarga y lecturas críticas de temperatura.',
    measures: ['Conteo_FueraRango', 'Alertas_Totales', 'Desviacion_Temp'], change: 'De 21 a 18 visuales: se retiró la serie diaria y se añadió el Top 5 circular.' }
];

const STATS = [['31.220', 'lecturas en DatosBI'], ['59', 'equipos'], ['65', 'variables'], ['3', 'páginas'], ['38,3 %', 'temperaturas fuera de 18–27 °C']];

const FLOW = [['Data Center Expert 8.3', 'Fuente de lecturas y alarmas'], ['Exportación CSV/Excel', 'Carga manual'], ['DatosBI + DAX', 'Reglas y umbrales'],
  ['Tablero Power BI', '3 páginas, filtros y ranking'], ['Esta página web', 'GitHub Pages']];

const HU = [
  { id: 'HU-01', est: 'imp', txt: 'Implementado', t: 'Vista general de climatización y potencia',
    h: 'Como operador NOC, quiero consultar las variables de climatización y potencia para reconocer rápido el comportamiento de los equipos.',
    ca: 'Dado un archivo válido, cuando abro el tablero, entonces veo las páginas con indicadores por variable.' },
  { id: 'HU-02', est: 'imp', txt: 'Implementado · tiempo por medir', t: 'Filtrar por equipo, sección y variable',
    h: 'Como operador NOC, quiero filtrar para analizar un elemento sin revisar todos los registros.',
    ca: 'Dado un segmentador seleccionado, entonces los visuales se actualizan en menos de 3 s.' },
  { id: 'HU-03', est: 'imp', txt: 'Reglas configuradas', t: 'Identificar lecturas fuera de umbral',
    h: 'Como operador NOC, quiero identificar lecturas fuera de umbral para reconocer condiciones que requieren revisión.',
    ca: 'Temperatura fuera de 18–27 °C, tensión de fase fuera de 108–132 V o frecuencia fuera de 59,5–60,5 Hz se cuentan como alerta; las demás no.' },
  { id: 'HU-04', est: 'ok', txt: 'Verificado', t: 'Ranking de equipos con más alertas',
    h: 'Como operador NOC, quiero un ranking para orientar el orden de revisión.',
    ca: 'El Top 5 y sus conteos coinciden con un conteo independiente (360, 280, 236, 217, 162).' },
  { id: 'HU-05', est: 'imp', txt: 'Implementado', t: 'Carga de UPS y balance por fase',
    h: 'Como operador NOC, quiero consultar la carga de UPS y el balance por fase para reconocer sobrecarga o desequilibrio.',
    ca: 'Si salida/entrada supera 100 %, el valor se resalta (UPS 2: 106,3 %); el balance A/B/C se muestra en gráfico circular.' },
  { id: 'HU-06', est: 'pen', txt: 'Por probar', t: 'Actualizar con un archivo exportado',
    h: 'Como operador NOC, quiero actualizar el tablero con un archivo de DCE para analizar un periodo más reciente.',
    ca: 'Al cambiar la ruta del origen y pulsar Actualizar, los datos y visuales reflejan el nuevo periodo (manual, no tiempo real).' },
  { id: 'HU-07', est: 'pen', txt: 'Por publicar', t: 'Consultar desde un navegador',
    h: 'Como supervisor del NOC, quiero consultar el tablero y su documentación desde la web sin instalar Power BI Desktop.',
    ca: 'Con la página en GitHub Pages, puedo navegar sus secciones y ver el informe incrustado o las capturas de la V2.' }
];

const CYCLE = [
  ['1. Recolección de requisitos', 'Actividad 2', 'Variables y umbrales tomados del checklist manual; historias HU-01 a HU-07.'],
  ['2. Diseño rápido', 'Modelo de datos', 'Tabla DatosBI en formato largo y tres páginas.'],
  ['3. Construcción · Versión 1', '20/09/2026', '22 medidas DAX, segmentadores y visuales de línea de tiempo.'],
  ['4. Evaluación', 'Contraste del Top 5', 'Coinciden los cinco primeros equipos; la línea de tiempo no ayuda a priorizar.'],
  ['5. Refinamiento · Versión 2', '28/09 – 26/10/2026', 'Prefijo P_, balance por fase, Top 5 circular, columna Detalle.'],
  ['6. Entrega · Iteración 3', 'En curso', 'Página web, pruebas por ejecutar, tiempos y usuario externo, tarjeta de fecha máxima.']
];

const TESTS = [
  ['PF-01', 'HU-01', 'Abrir el PBIX y ver las tres páginas.'],
  ['PF-02', 'HU-02', 'Usar los segmentadores de equipo, sección y variable.'],
  ['PF-03', 'HU-03', 'Comprobar umbrales con casos dentro y fuera de rango.'],
  ['PF-04', 'HU-04', 'Comparar el Top 5 con un conteo independiente.'],
  ['PF-05', 'HU-05', 'Revisar carga de UPS (>100 %) y balance por fase.'],
  ['PF-06', 'HU-06', 'Actualizar el origen con un archivo posterior.'],
  ['PF-07', 'HU-02', 'Medir filtro (<3 s), carga (<10 s) y usuario externo (<1 min).'],
  ['PF-08', 'HU-07', 'Abrir esta página en escritorio y móvil.']
];

/* ===== Render ===== */
function init() {
  $('#stats').append(...STATS.map(([b, s]) => el('div', 'stat', `<b>${b}</b><span>${s}</span>`)));
  $('#flow').append(...FLOW.map(([a, b]) => el('li', '', `<strong>${a}</strong><small>${b}</small>`)));
  $('#timeline').append(...CYCLE.map(([a, b, c]) => el('li', '', `<b>${a}</b><small>${b}</small>${c}`)));
  initTabs(); initHU(); initTests(); initCompare(); initTheme(); initNav();
}

function initTabs() {
  const tabs = $('#pageTabs');
  const show = i => {
    const p = PAGES[i];
    [...tabs.children].forEach((b, j) => b.setAttribute('aria-selected', j === i));
    const f = $('#frame'); f.replaceChildren();
    if (POWERBI_EMBED_URL) {
      const ifr = el('iframe'); ifr.src = POWERBI_EMBED_URL; ifr.title = 'Informe Power BI'; ifr.allowFullscreen = true; f.append(ifr);
    } else {
      const im = el('img'); im.src = p.v2; im.alt = 'Captura de ' + p.name + ' (versión 2)'; f.append(im);
    }
    $('#pageInfo').innerHTML = `<p>${p.text}</p><p><strong>Medidas:</strong> ${p.measures.map(m => `<span class="pill">${m}</span>`).join('')}
      <strong>Historias:</strong> ${p.hu.map(h => `<span class="pill">${h}</span>`).join('')}</p><p class="muted">${p.change}</p>`;
  };
  PAGES.forEach((p, i) => { const b = el('button', 'tab', p.name); b.role = 'tab'; b.onclick = () => show(i); tabs.append(b); });
  show(0);
}

function initHU() {
  const opts = [['all', 'Todas'], ['ok', 'Verificadas'], ['imp', 'Implementadas'], ['pen', 'Pendientes']];
  const box = $('#huFilters'); let cur = 'all';
  const draw = () => {
    [...box.children].forEach(c => c.classList.toggle('on', c.dataset.k === cur));
    $('#huList').replaceChildren(...HU.filter(h => cur === 'all' || h.est === cur).map(h =>
      el('article', 'card', `<span class="badge ${h.est}">${h.txt}</span><h3>${h.id} · ${h.t}</h3><p>${h.h}</p><p><strong>Criterio:</strong> ${h.ca}</p>`)));
  };
  opts.forEach(([k, n]) => { const b = el('button', 'chip', n); b.dataset.k = k; b.onclick = () => { cur = k; draw(); }; box.append(b); });
  draw();
}

function initTests() {
  let done = store.get('tests', {});
  const list = $('#tests');
  const upd = () => {
    const n = TESTS.filter(t => done[t[0]]).length;
    $('#bar').style.width = (n / TESTS.length * 100) + '%';
    $('#progressText').textContent = `${n} de ${TESTS.length} pruebas marcadas`;
  };
  const draw = () => {
    list.replaceChildren(...TESTS.map(([id, hu, txt]) => {
      const li = el('li'); const lb = el('label');
      const cb = el('input'); cb.type = 'checkbox'; cb.checked = !!done[id];
      cb.onchange = () => { done[id] = cb.checked; store.set('tests', done); upd(); };
      lb.append(cb, el('span', '', `<strong>${id}</strong> (${hu}) — ${txt}`)); li.append(lb); return li;
    })); upd();
  };
  $('#resetTests').onclick = () => { done = {}; store.set('tests', done); draw(); };
  draw();
}

function initCompare() {
  const sel = $('#cmpPage'), a = $('#cmpA'), b = $('#cmpB'), over = $('#cmpOver'), box = $('#compare'), rg = $('#cmpRange');
  PAGES.forEach((p, i) => sel.append(new Option(p.name, i)));
  const size = () => { a.style.width = box.clientWidth + 'px'; };
  const set = () => { over.style.width = rg.value + '%'; };
  const load = () => {
    const p = PAGES[sel.value]; a.src = p.v1; b.src = p.v2; $('#cmpNote').textContent = p.change;
    b.onload = a.onload = size;
  };
  sel.onchange = load; rg.oninput = set; addEventListener('resize', size); load(); set();
}

function initTheme() {
  const root = document.documentElement, saved = store.get('theme', null);
  if (saved) root.dataset.theme = saved;
  $('#theme').onclick = () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark'; store.set('theme', root.dataset.theme);
  };
}

function initNav() {
  const links = [...document.querySelectorAll('#nav a')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section').forEach(s => io.observe(s));
}

document.addEventListener('DOMContentLoaded', init);
