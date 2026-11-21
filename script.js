'use strict';
/* Réplica interactiva del informe Power BI "Proyecto_Datacenter_Version_2.pbix".
   Datos: tabla DatosBI exportada del PBIX (data.js). Medidas: traducción de las medidas DAX del modelo. */
/* Enlace opcional al informe publicado en Power BI (Archivo > Insertar informe). */
const POWERBI_URL = "";
const CF = {"TempSumSal": [{"c": [[">=", 0.0], ["<", 18.0]], "color": "#90F4F7"}, {"c": [[">=", 18.0], ["<", 23.0]], "color": "#0BF148"}, {"c": [[">=", 23.0], ["<=", 37.0]], "color": "#F10B0B"}], "Discharge": [{"c": [[">", 0.0], ["<", 1800.0]], "color": "#90F4F7"}, {"c": [[">=", 2801.0], ["<", 9000.0]], "color": "#F10B0B"}, {"c": [[">=", 2500.0], ["<=", 2800.0]], "color": "#F2F20A"}, {"c": [[">=", 1800.0], ["<=", 2500.0]], "color": "#0BF148"}], "Suction": [{"c": [[">=", 0.0], ["<", 800.0]], "color": "#90F4F7"}, {"c": [[">=", 1101.0], ["<=", 9999.0]], "color": "#F10B0B"}, {"c": [[">=", 1001.0], ["<=", 1100.0]], "color": "#F2F20A"}, {"c": [[">=", 800.0], ["<=", 1000.0]], "color": "#0BF148"}], "Superheat": [{"c": [[">=", 0.0], ["<", 3.9]], "color": "#90F4F7"}, {"c": [[">=", 12.1], ["<", 9999.0]], "color": "#F10B0B"}, {"c": [[">=", 8.1], ["<=", 12.0]], "color": "#F6B644"}, {"c": [[">=", 4.0], ["<=", 8.0]], "color": "#0BF148"}], "Horas": [{"c": [[">=", 70001.0], ["<", 200000.0]], "color": "#F10B0B"}, {"c": [[">=", 50001.0], ["<=", 70000.0]], "color": "#F6B644"}, {"c": [[">=", 30001.0], ["<=", 50000.0]], "color": "#F2F20A"}, {"c": [[">=", 0.0], ["<=", 30000.0]], "color": "#0BF148"}], "TempRet": [{"c": [[">=", 32.0], ["<", 100.0]], "color": "#F10B0B"}, {"c": [[">=", 30.0], ["<=", 32.0]], "color": "#F6B644"}, {"c": [[">=", 27.0], ["<=", 30.0]], "color": "#F2F20A"}, {"c": [[">=", 18.0], ["<=", 27.0]], "color": "#0BF148"}, {"c": [[">=", 0.0], ["<", 18.0]], "color": "#90F4F7"}], "Frecuencia": [{"c": [[">=", 0.0], ["<=", 59.5]], "color": "#DA0505"}, {"c": [[">", 60.5]], "color": "#D70202"}], "Tension": [{"c": [["<", 108.0]], "color": "#E80606"}, {"c": [[">", 132.0]], "color": "#E80606"}], "Critica": [{"c": [[">=", 18.0], ["<=", 27.0]], "color": "#0BF148"}, {"c": [[">", 27.0], ["<", 50.0]], "color": "#F10B0B"}, {"c": [[">=", 0.0], ["<", 18.0]], "color": "#90F4F7"}], "PctCarga": [{"c": [[">=", 91.0], ["<", 200.0]], "color": "#F10B0B"}, {"c": [[">=", 81.0], ["<", 90.0]], "color": "#F6B644"}, {"c": [[">=", 71.0], ["<=", 80.0]], "color": "#0BF148"}, {"c": [[">=", 0.0], ["<=", 70.0]], "color": "#90F4F7"}]};
const DAX = {"Min_TempRetorno": "CALCULATE(MIN(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"TEMP RETORNO\")", "P_TempRetorno": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"TEMP RETORNO\")", "Max_TempRetorno": "CALCULATE(MAX(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"TEMP RETORNO\")", "Horas_Compresor": "CALCULATE(MAX(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \" COMPRESOR\")", "P_DischargePressure": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"Discharge Pressure\")", "P_SuctionPressure": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"Suction Pressure\")", "P_Superheat": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"Superheat temperature\")", "Prom_EntradaKVA": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"ENTRADA (KVA)\")", "Prom_CargaSalidaKVA": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"CARGA SALIDA (KVA)\")", "Pct_Carga_UPS": "DIVIDE([Prom_CargaSalidaKVA], [Prom_EntradaKVA])", "Prom_KW_Subestacion": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"KW\")", "Energia_PDU_Total": "CALCULATE(MAX(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"Total Energy Used\")", "Prom_FrecuenciaHz": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"FRECUENCIA (Hz)\")", "Prom_TensionFasePDU": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"TENSIÓN DE FASE (VAC A LA ENTRADA)\")", "Pct_Fuera_Rango": "DIVIDE(CALCULATE(COUNTROWS(DatosBI), DatosBI[Detalle] = \"°C\", DatosBI[Valor_numerico] < 18 || DatosBI[Valor_numerico] > 27), CALCULATE(COUNTROWS(DatosBI), DatosBI[Detalle] = \"°C\"))", "Total_Equipos": "DISTINCTCOUNT(DatosBI[Equipo])", "Total_Lecturas": "COUNTROWS(DatosBI)", "Conteo_FueraRango": "CALCULATE(COUNTROWS(DatosBI), DatosBI[Detalle] = \"°C\", DatosBI[Valor_numerico] < 18 || DatosBI[Valor_numerico] > 27)", "Consumo_Total_PDU": "SUMX(VALUES(DatosBI[Equipo]), [Energia_PDU_Total])", "Alertas_Totales": "[Conteo_FueraRango] + CALCULATE(COUNTROWS(DatosBI), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"TENSIÓN DE FASE (VAC A LA ENTRADA)\", DatosBI[Valor_numerico] < 108 || DatosBI[Valor_numerico] > 132) + CALCULATE(COUNTROWS(DatosBI), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"FRECUENCIA (Hz)\", DatosBI[Valor_numerico] < 59.5 || DatosBI[Valor_numerico] > 60.5)", "Relacion_Presion": "DIVIDE([P_DischargePressure], [P_SuctionPressure])", "P_TempSumSal": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"TEMP SUMINISTRO\" || DatosBI[Variable] = \"TEMP SALIDA\")", "Prom_CorrientePorFase": "CALCULATE(AVERAGE(DatosBI[Valor_numerico]), REMOVEFILTERS(DatosBI[Variable]), DatosBI[Variable] = \"CORRIENTE POR FASE\")"};
const D = window.DATOS, V = D.Valor, N = V.length, E = D.Equipo, S = D.Seccion, VA = D.Variable, DE = D.Detalle, TU = D.Turno, FE = D.Fecha;
const $ = (s, r = document) => r.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const fmt = (v, k = 'n2') => {
  if (v == null || isNaN(v)) return '';
  if (k === 'int') return Math.round(v).toLocaleString('es-CO');
  if (k === 'pct') return (v * 100).toLocaleString('es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' %';
  return v.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
const idsOf = (key, names) => new Set(names.map(n => D[key + '_u'].indexOf(n)).filter(i => i >= 0));
const label = (cat, id) => D[cat + '_u'][id];

/* ---------- Medidas (equivalentes a las medidas DAX del modelo) ---------- */
const VS = {
  TEMP: idsOf('Variable', ['TEMP RETORNO']), SUMSAL: idsOf('Variable', ['TEMP SUMINISTRO', 'TEMP SALIDA']), COMP: idsOf('Variable', [' COMPRESOR']),
  DISC: idsOf('Variable', ['Discharge Pressure']), SUCT: idsOf('Variable', ['Suction Pressure']), SUPER: idsOf('Variable', ['Superheat temperature']),
  KVAIN: idsOf('Variable', ['ENTRADA (KVA)']), KVAOUT: idsOf('Variable', ['CARGA SALIDA (KVA)']), KW: idsOf('Variable', ['KW']),
  ENER: idsOf('Variable', ['Total Energy Used']), FREQ: idsOf('Variable', ['FRECUENCIA (Hz)']), TENS: idsOf('Variable', ['TENSIÓN DE FASE (VAC A LA ENTRADA)']),
  CORR: idsOf('Variable', ['CORRIENTE POR FASE'])
};
const DEG = D.Detalle_u.indexOf('°C');
const avg = (rn, ids) => { let s = 0, c = 0; for (const i of rn) if (V[i] != null && ids.has(VA[i])) { s += V[i]; c++; } return c ? s / c : null; };
const mx = (rn, ids) => { let m = null; for (const i of rn) if (V[i] != null && ids.has(VA[i]) && (m === null || V[i] > m)) m = V[i]; return m; };
const mn = (rn, ids) => { let m = null; for (const i of rn) if (V[i] != null && ids.has(VA[i]) && (m === null || V[i] < m)) m = V[i]; return m; };
const div = (a, b) => (a == null || !b) ? null : a / b;
const cntTemp = rv => { let c = 0; for (const i of rv) if (DE[i] === DEG && V[i] != null && (V[i] < 18 || V[i] > 27)) c++; return c || null; };
const cntOut = (rn, ids, lo, hi) => { let c = 0; for (const i of rn) if (ids.has(VA[i]) && V[i] != null && (V[i] < lo || V[i] > hi)) c++; return c; };
// Cada medida recibe rn (filas sin filtro de Variable: REMOVEFILTERS) y rv (filas con filtro de Variable).
const M = {
  P_TempRetorno: (rn) => avg(rn, VS.TEMP), Min_TempRetorno: (rn) => mn(rn, VS.TEMP), Max_TempRetorno: (rn) => mx(rn, VS.TEMP),
  Horas_Compresor: (rn) => mx(rn, VS.COMP), P_DischargePressure: (rn) => avg(rn, VS.DISC), P_SuctionPressure: (rn) => avg(rn, VS.SUCT),
  P_Superheat: (rn) => avg(rn, VS.SUPER), P_TempSumSal: (rn) => avg(rn, VS.SUMSAL), Prom_EntradaKVA: (rn) => avg(rn, VS.KVAIN),
  Prom_CargaSalidaKVA: (rn) => avg(rn, VS.KVAOUT), Pct_Carga_UPS: (rn) => div(avg(rn, VS.KVAOUT), avg(rn, VS.KVAIN)),
  Prom_KW_Subestacion: (rn) => avg(rn, VS.KW), Energia_PDU_Total: (rn) => mx(rn, VS.ENER), Prom_FrecuenciaHz: (rn) => avg(rn, VS.FREQ),
  Prom_TensionFasePDU: (rn) => avg(rn, VS.TENS), Prom_CorrientePorFase: (rn) => avg(rn, VS.CORR),
  Relacion_Presion: (rn) => div(avg(rn, VS.DISC), avg(rn, VS.SUCT)),
  Conteo_FueraRango: (rn, rv) => cntTemp(rv),
  Alertas_Totales: (rn, rv) => { const a = cntTemp(rv), b = cntOut(rn, VS.TENS, 108, 132), c = cntOut(rn, VS.FREQ, 59.5, 60.5); const t = (a || 0) + b + c; return (a == null && !b && !c) ? null : t; }
};

/* ---------- Páginas (posiciones en el lienzo 1920 x 1080 del informe) ---------- */
const GREEN = '#348b74';
const T = (x, y, w, h, text, o = {}) => ({ t: 'text', x, y, w, h, text, ...o });
const SL = (x, y, w, h, f, o = {}) => ({ t: 'slicer', x, y, w, h, f, ...o });
const UPS = ['UPS 1', 'UPS 2', 'POTENCIA 2  UPS'], PDUS = ['PDU 1', 'PDU 2', 'PDU INVERSOR', 'PDU UPS'], SUBS = ['SÓTANO SUBESTACIÓN AUTOPISTA', 'SÓTANO SUBESTACIÓN MORATO'];
const tbl = (x, y, w, h, cols, o = {}) => ({ t: 'table', x, y, w, h, cat: 'Equipo', cols, ...o });
const bar = (x, y, w, h, m, o = {}) => ({ t: 'bar', x, y, w, h, cat: 'Equipo', ms: [m], ...o });

const PAGES = [
  { name: 'Aires y Temperaturas', title: ['Aires y Temperaturas - UMAs', '#5009c9', 28], id: 'aires', sortDir: { Equipo: 1 }, filt: { Equipo: n => n.toUpperCase().includes('UMA'), Seccion: n => !n.toUpperCase().includes('UMA'), Variable: n => !n.toUpperCase().includes('UMA') },
    v: [
      SL(68, 87, 216, 142, 'Equipo'), SL(301, 94, 299, 135, 'Seccion'), SL(618, 91, 280, 138, 'Variable'),
      T(963, 90, 299, 23, 'Discharge Pressure por UMA'), T(1259, 90, 299, 23, 'Suction Pressure por UMA'), T(1558, 87, 294, 26, 'Temp Retorno por UMA'),
      bar(963, 114, 295, 250, 'P_DischargePressure'), bar(1259, 114, 299, 250, 'P_SuctionPressure'), bar(1558, 114, 294, 322, 'P_TempRetorno'),
      tbl(963, 364, 295, 383, [{ h: 'Equipo' }, { m: 'P_DischargePressure', cf: 'Discharge' }], { total: 1 }),
      tbl(1259, 364, 299, 386, [{ h: 'Equipo' }, { m: 'P_SuctionPressure', cf: 'Suction' }], { total: 1 }),
      tbl(1556, 436, 295, 400, [{ h: 'Equipo' }, { m: 'P_TempRetorno', cf: 'TempRet' }], { total: 1 }),
      T(68, 253, 295, 25, 'Superheat Temp por UMA'), T(364, 253, 303, 34, 'Temp Suministro por UMA'), T(668, 253, 281, 25, 'Horas Compresor por UMA'),
      bar(68, 280, 295, 380, 'P_Superheat'), bar(364, 278, 303, 382, 'P_TempSumSal'), bar(664, 278, 299, 382, 'Horas_Compresor'),
      tbl(64, 660, 300, 383, [{ h: 'Equipo' }, { m: 'P_Superheat', cf: 'Superheat' }], { total: 1 }),
      tbl(364, 660, 302, 383, [{ h: 'Equipo' }, { m: 'P_TempSumSal', cf: 'TempSumSal' }], { total: 1 }),
      tbl(668, 660, 292, 383, [{ h: 'Equipo' }, { m: 'Horas_Compresor', cf: 'Horas' }], { total: 1 }),
      T(960, 751, 602, 50, 'Top 10 UMAs - Relación Presión Descarga/Succión<br>(si la descarga sube, la relación también sube)'),
      bar(963, 801, 595, 242, 'Relacion_Presion', { top: 10 }),
      { t: 'card', x: 1652, y: 837, w: 200, h: 68, m: 'Min_TempRetorno' }, { t: 'card', x: 1652, y: 906, w: 200, h: 68, m: 'Max_TempRetorno' }, { t: 'card', x: 1652, y: 975, w: 200, h: 68, m: 'P_TempRetorno' }
    ] },
  { name: 'Potencia y Eléctrico', title: ['Potencia y Eléctrico', '#5009c9', 28], id: 'potencia', sortDir: { Equipo: -1 }, filt: { Equipo: n => !n.toUpperCase().includes('UMA'), Seccion: n => !n.toUpperCase().includes('UMA'), Variable: n => !n.toUpperCase().includes('UMA') },
    v: [
      SL(31, 70, 252, 175, 'Equipo'), SL(299, 70, 300, 175, 'Seccion'), SL(625, 70, 280, 175, 'Variable'),
      T(924, 94, 476, 25, 'Consumo Promedio (kW) por Subestación'), T(1401, 94, 496, 25, 'Consumo Eléct. Acumulado (kWh) por PDU'),
      bar(923, 120, 478, 296, 'Prom_KW_Subestacion', { col: 1, eqIn: SUBS }), bar(1401, 120, 496, 296, 'Energia_PDU_Total'),
      T(31, 268, 892, 28, 'Balance de Carga por Fase (A/B/C) - PDUs'),
      { t: 'pie', x: 31, y: 296, w: 874, h: 288, cat: 'Detalle', m: 'Prom_CorrientePorFase', fmtV: 'n2' },
      tbl(923, 416, 478, 167, [{ h: 'Equipo' }, { m: 'Prom_KW_Subestacion' }], { total: 1, eqIn: SUBS, sortBy: 'Equipo', asc: 1 }),
      tbl(1401, 416, 496, 167, [{ h: 'Equipo' }, { m: 'Energia_PDU_Total' }], { total: 1 }),
      T(36, 608, 478, 29, 'KVA Entrada vs Carga Salida por UPS'), T(478, 608, 445, 29, '% de Carga del UPS (Salida/Entrada)'), T(923, 608, 478, 28, 'Frecuencia (Hz) por UPS'), T(1401, 608, 496, 29, 'Tensión Fase de PDUs  Alerta ±10% (108-132V)'),
      { t: 'bar', x: 31, y: 636, w: 446, h: 280, cat: 'Equipo', ms: ['Prom_EntradaKVA', 'Prom_CargaSalidaKVA'], col: 1, eqIn: UPS },
      bar(478, 636, 446, 280, 'Pct_Carga_UPS', { col: 1, eqIn: UPS, f: 'pct' }), bar(923, 636, 478, 280, 'Prom_FrecuenciaHz', { col: 1, eqIn: UPS }),
      bar(1401, 636, 496, 280, 'Prom_TensionFasePDU', { eqIn: PDUS }),
      tbl(31, 916, 446, 144, [{ h: 'Equipo' }, { m: 'Prom_EntradaKVA' }, { m: 'Prom_CargaSalidaKVA' }], { total: 1, eqIn: UPS }),
      tbl(478, 916, 445, 144, [{ h: 'Equipo' }, { m: 'Pct_Carga_UPS', f: 'pct' }], { total: 1, eqIn: UPS }),
      tbl(923, 916, 478, 144, [{ h: 'Equipo' }, { m: 'Prom_FrecuenciaHz', cf: 'Frecuencia' }], { total: 1, eqIn: UPS }),
      tbl(1437, 916, 460, 144, [{ h: 'Equipo' }, { m: 'Prom_TensionFasePDU', cf: 'Tension' }], { total: 1, eqIn: PDUS })
    ] },
  { name: 'Ranking de Alertas', title: ['Ranking de Alertas', '#12239e', 36], id: 'ranking', sortDir: { Equipo: -1 }, filt: {},
    pageFilter: v => v != null && (v < 108 || v > 132),
    v: [
      SL(37, 94, 204, 177, 'Equipo'), SL(241, 95, 254, 176, 'Seccion'), SL(538, 92, 280, 178, 'Variable'),
      T(822, 93, 645, 24, 'Consumo Eléctrico Total Acumulado por PDU (kWh)'), T(1468, 92, 389, 24, '% Carga Promedio de UPS'),
      bar(822, 117, 645, 281, 'Energia_PDU_Total'), bar(1468, 117, 390, 281, 'Pct_Carga_UPS', { col: 1, f: 'pct' }),
      T(37, 286, 136, 99, 'Voltaje Fuera de Rango (PDUs)'), { t: 'volt', x: 174, y: 271, w: 596, h: 128 },
      T(37, 414, 750, 28, 'Lecturas Críticas de Temperatura más alejadas del rango normal (18-27°C)'), { t: 'crit', x: 0, y: 442, w: 1108, h: 638 },
      T(1152, 414, 183, 126, 'Top 5 - Mayor % de Carga Eléctrica (Riesgo de Sobrecarga)'), T(1356, 414, 501, 28, 'Top 5 Equipos con Más Lecturas Fuera de Rango'),
      bar(1356, 442, 497, 250, 'Conteo_FueraRango', { top: 5, f: 'int' }),
      tbl(1146, 513, 210, 180, [{ h: 'Equipo' }, { m: 'Pct_Carga_UPS', f: 'pct', cf: 'PctCarga' }], { total: 1, top: 5, asc: 1 }),
      T(1152, 712, 705, 35, 'Top 5 - Equipos con Más Alertas (Térmicas + Eléctricas)'),
      { t: 'pie', x: 1151, y: 744, w: 703, h: 303, cat: 'Equipo', m: 'Alertas_Totales', top: 5, fmtV: 'int' }
    ] }
];

/* ---------- Estado, contexto de filtros y agrupación ---------- */
const state = PAGES.map(() => ({ Equipo: new Set(), Seccion: new Set(), Variable: new Set(), pick: null, pickSrc: null }));
let cur = 0;
function buildCtx(pg, st, usePick) {
  const rn = [], rv = [], pf = pg.pageFilter;
  for (let i = 0; i < N; i++) {
    if (pf && !pf(V[i])) continue;
    if (st.Equipo.size && !st.Equipo.has(E[i])) continue;
    if (usePick && st.pick != null && E[i] !== st.pick) continue;
    if (st.Seccion.size && !st.Seccion.has(S[i])) continue;
    rn.push(i);
    if (st.Variable.size && !st.Variable.has(VA[i])) continue;
    rv.push(i);
  }
  return { rn, rv, g: {} };
}
function groups(c, cat) {
  if (c.g[cat]) return c.g[cat];
  const arr = cat === 'Equipo' ? E : DE, gv = new Map(), gn = new Map();
  for (const i of c.rv) { const k = arr[i]; (gv.get(k) || gv.set(k, []).get(k)).push(i); }
  for (const i of c.rn) { const k = arr[i]; (gn.get(k) || gn.set(k, []).get(k)).push(i); }
  return c.g[cat] = { gv, gn };
}
function series(c, vis, m, sortM, asc, top) {
  const { gv, gn } = groups(c, vis.cat);
  const eq = vis.eqIn ? idsOf('Equipo', vis.eqIn) : null;
  let rows = [];
  for (const [k, rvv] of gv) {
    if (eq && !eq.has(k)) continue;
    const val = M[m](gn.get(k) || [], rvv);
    if (val != null) rows.push({ k, name: label(vis.cat, k), v: val });
  }
  const sm = sortM || m;
  if (sm !== m) { for (const r of rows) r.s = M[sm](gn.get(r.k) || [], gv.get(r.k)); } else rows.forEach(r => r.s = r.v);
  rows.sort((a, b) => b.s - a.s);
  if (top) rows = rows.slice(0, top);
  if (vis.sortBy === 'Equipo') rows.sort((a, b) => (a.name < b.name ? -1 : 1) * (asc ? 1 : -1));
  else if (asc) rows.reverse();
  return rows;
}
const total = (c, m, eqIn) => {
  if (!eqIn) return M[m](c.rn, c.rv);
  const eq = idsOf('Equipo', eqIn);
  return M[m](c.rn.filter(i => eq.has(E[i])), c.rv.filter(i => eq.has(E[i])));
};
const cfColor = (key, v) => {
  if (v == null || !CF[key]) return '';
  for (const cs of CF[key]) if (cs.c.every(([op, x]) => op === '>' ? v > x : op === '>=' ? v >= x : op === '<' ? v < x : op === '<=' ? v <= x : v === x)) return cs.color;
  return '';
};

/* ---------- Render de visuales ---------- */
const u = n => `calc(var(--u)*${n})`;
function panel(vis, cls) {
  const p = el('div', 'p ' + cls);
  p.style.cssText = `left:${vis.x / 19.2}%;top:${vis.y / 10.8}%;width:${vis.w / 19.2}%;height:${vis.h / 10.8}%`;
  return p;
}
function pickable(node, key, pgi, vid) {
  node.classList.add('pk');
  node.onclick = () => { const s = state[pgi]; if (s.pick === key && s.pickSrc === vid) { s.pick = null; s.pickSrc = null; } else { s.pick = key; s.pickSrc = vid; } render(); };
}
function rBar(vis, ctxs, pgi, vid) {
  const c = state[pgi].pickSrc === vid ? ctxs.all : ctxs.pick;
  const asc = false;
  const ms = vis.ms;
  const rows = series(c, vis, ms[0], null, false, vis.top);
  const p = panel(vis, 'chart ' + (vis.col ? 'col' : 'row'));
  const f = vis.f || 'n2';
  const max = Math.max(1e-9, ...rows.flatMap(r => ms.map(m => M[m](groups(c, vis.cat).gn.get(r.k) || [], groups(c, vis.cat).gv.get(r.k)) || 0)));
  const colors = ['#44697d', '#d9b24c'];
  const wrap = el('div', 'plot');
  const sel = state[pgi].pickSrc === vid ? state[pgi].pick : null;
  rows.forEach(r => {
    const g = groups(c, vis.cat);
    const vals = ms.map(m => M[m](g.gn.get(r.k) || [], g.gv.get(r.k)) || 0);
    const it = el('div', 'it' + (sel != null && sel !== r.k ? ' dim' : ''));
    it.title = `${r.name}: ${vals.map(v => fmt(v, f)).join(' / ')}`;
    if (vis.col) {
      it.innerHTML = `<div class="cols">${vals.map((v, i) => `<i style="height:${v / max * 100}%;background:${colors[i]}"></i>`).join('')}</div><span class="lb">${r.name}</span>`;
    } else {
      it.innerHTML = `<span class="lb">${r.name}</span><div class="trk"><i style="width:${vals[0] / max * 100}%;background:${colors[0]}"></i></div>`;
    }
    pickable(it, r.k, pgi, vid); wrap.append(it);
  });
  p.append(wrap);
  const ax = el('div', 'axis', `<span>0</span><span>${fmt(max / 2, f === 'pct' ? 'pct' : f === 'int' ? 'int' : 'n2').replace(/,00$/, '')}</span><span>${fmt(max, f === 'pct' ? 'pct' : f === 'int' ? 'int' : 'n2').replace(/,00$/, '')}</span>`);
  p.append(ax);
  if (ms.length > 1) p.append(el('div', 'legend', ms.map((m, i) => `<b style="background:${colors[i]}"></b>${m}`).join(' ')));
  if (!rows.length) wrap.innerHTML = '<div class="empty">Sin datos con el filtro actual</div>';
  return p;
}
function rTable(vis, ctxs, pgi, vid) {
  const c = state[pgi].pickSrc === vid ? ctxs.all : ctxs.pick;
  const p = panel(vis, 'tbl');
  const m0 = vis.cols.find(x => x.m).m;
  const rows = series(c, vis, m0, null, vis.asc, vis.top);
  const sel = state[pgi].pickSrc === vid ? state[pgi].pick : null;
  const g = groups(c, vis.cat);
  let h = '<table><thead><tr>' + vis.cols.map(x => `<th>${x.h || x.m}</th>`).join('') + '</tr></thead><tbody>';
  const rowsHtml = rows.map(r => '<tr data-k="' + r.k + '"' + (sel != null && sel !== r.k ? ' class="dim"' : '') + '>' + vis.cols.map(x => {
    if (!x.m) return `<td class="n">${r.name}</td>`;
    const v = M[x.m](g.gn.get(r.k) || [], g.gv.get(r.k)); const col = x.cf ? cfColor(x.cf, v) : '';
    return `<td class="v" style="${col ? 'background:' + col : ''}">${fmt(v, x.f || (x.m === 'Conteo_FueraRango' ? 'int' : 'n2'))}</td>`;
  }).join('') + '</tr>').join('');
  h += rowsHtml + '</tbody>';
  if (vis.total) h += '<tfoot><tr><td>Total</td>' + vis.cols.filter(x => x.m).map(x => `<td class="v">${fmt(total(c, x.m, vis.eqIn), x.f || 'n2')}</td>`).join('') + '</tr></tfoot>';
  p.innerHTML = '<div class="scroll">' + h + '</table></div>';
  p.querySelectorAll('tbody tr').forEach(tr => pickable(tr, +tr.dataset.k, pgi, vid));
  return p;
}
const PAL = ['#3e6e80', '#d9b24c', '#a9573b', '#c75c3b', '#c9a36a', '#7a9e7e', '#8a6fa8'];
function rPie(vis, ctxs, pgi, vid) {
  const c = state[pgi].pickSrc === vid ? ctxs.all : ctxs.pick;
  const rows = series(c, vis, vis.m, null, false, vis.top).filter(r => r.v > 0);
  const p = panel(vis, 'pie'), sum = rows.reduce((a, r) => a + r.v, 0);
  let a0 = -Math.PI / 2, paths = '', lab = '';
  const sel = state[pgi].pickSrc === vid ? state[pgi].pick : null;
  rows.forEach((r, i) => {
    const a1 = a0 + r.v / sum * 2 * Math.PI, R = 100, large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = R * Math.cos(a0), y0 = R * Math.sin(a0), x1 = R * Math.cos(a1), y1 = R * Math.sin(a1);
    const d = rows.length === 1 ? `M0 -${R}A${R} ${R} 0 1 1 0 ${R}A${R} ${R} 0 1 1 0 -${R}Z` : `M0 0L${x0} ${y0}A${R} ${R} 0 ${large} 1 ${x1} ${y1}Z`;
    paths += `<path class="sl${sel != null && sel !== r.k ? ' dim' : ''}" data-k="${r.k}" d="${d}" fill="${PAL[i % PAL.length]}"><title>${r.name}: ${fmt(r.v, vis.fmtV)} (${(r.v / sum * 100).toFixed(2)}%)</title></path>`;
    const am = (a0 + a1) / 2; lab += `<text x="${130 * Math.cos(am)}" y="${130 * Math.sin(am)}" text-anchor="${Math.cos(am) >= 0 ? 'start' : 'end'}">${fmt(r.v, vis.fmtV)} (${(r.v / sum * 100).toFixed(1).replace('.', ',')}%)</text>`;
    a0 = a1;
  });
  p.innerHTML = `<div class="cap">${vis.m}<small>por ${vis.cat === 'Detalle' ? 'Detalle' : 'Equipo'}</small></div><div class="pw"><svg viewBox="-320 -150 640 300" preserveAspectRatio="xMidYMid meet">${paths}${lab}</svg><div class="legend v">${rows.map((r, i) => `<div><b style="background:${PAL[i % PAL.length]}"></b>${r.name}</div>`).join('')}</div></div>`;
  p.querySelectorAll('.sl').forEach(s => pickable(s, +s.dataset.k, pgi, vid));
  if (!rows.length) p.innerHTML += '<div class="empty">Sin datos</div>';
  return p;
}
function rCard(vis, ctxs, pgi) {
  const c = ctxs.pick, p = panel(vis, 'card');
  p.innerHTML = `<b>${fmt(total(c, vis.m))}</b><span>${vis.m}</span>`; return p;
}
const dateTxt = d => { const t = new Date(Date.UTC(2026, 6, 31 + d)); return t.toLocaleDateString('es-CO', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }); };
const devT = v => v > 27 ? v - 27 : v < 18 ? 18 - v : 0;
function rCrit(vis, ctxs) {
  const c = ctxs.pick, p = panel(vis, 'tbl crit'), out = [];
  for (const i of c.rv) if (DE[i] === DEG && V[i] != null && !D.Equipo_u[E[i]].toUpperCase().includes('UMA')) out.push(i);
  out.sort((a, b) => V[b] - V[a]);
  const sum = out.reduce((s, i) => s + V[i], 0);
  const shown = out.slice(0, 400);
  p.innerHTML = `<div class="scroll"><table><thead><tr><th>Desviacion_Temp</th><th>Promedio de Valor_numerico</th><th>Detalle</th><th>Equipo</th><th>Turno</th><th>Fecha</th></tr></thead><tbody>${shown.map(i => {
    const col = cfColor('Critica', V[i]); return `<tr><td class="v">${fmt(devT(V[i]))}</td><td class="v" style="${col ? 'background:' + col : ''}">${fmt(V[i])}</td><td>°C</td><td class="n">${label('Equipo', E[i])}</td><td>${label('Turno', TU[i])}</td><td>${dateTxt(FE[i])}</td></tr>`;
  }).join('')}</tbody><tfoot><tr><td></td><td class="v">${out.length ? fmt(sum / out.length) : ''}</td><td colspan="4">${out.length > 400 ? `Mostrando 400 de ${out.length.toLocaleString('es-CO')} lecturas` : `${out.length} lecturas`}</td></tr></tfoot></table></div>`;
  return p;
}
function rVolt(vis, ctxs) {
  const c = ctxs.pick, p = panel(vis, 'tbl'), out = [];
  for (const i of c.rv) if (VS.TENS.has(VA[i]) && V[i] != null && (V[i] < 108 || V[i] > 132)) out.push(i);
  p.innerHTML = `<div class="scroll"><table><thead><tr><th>Fecha</th><th>Equipo</th><th>Turno</th><th>Suma de Valor_numerico</th></tr></thead><tbody>${out.slice(0, 200).map(i => `<tr><td>${dateTxt(FE[i])}</td><td class="n">${label('Equipo', E[i])}</td><td>${label('Turno', TU[i])}</td><td class="v">${fmt(V[i])}</td></tr>`).join('') || '<tr><td colspan="4" class="empty">Sin lecturas fuera de 108–132 V en el periodo</td></tr>'}</tbody></table></div>`;
  return p;
}
function rSlicer(vis, pgi, pg) {
  const p = panel(vis, 'slicer'), st = state[pgi], f = vis.f, fl = pg.filt[f] || (() => true);
  let items = D[f + '_u'].map((n, i) => ({ n, i })).filter(x => x.n && fl(x.n));
  const dir = (pg.sortDir && pg.sortDir[f]) || 1; items.sort((a, b) => (a.n < b.n ? -1 : 1) * dir);
  p.innerHTML = `<div class="sh">${f}</div><div class="sl-list"></div>`;
  const list = $('.sl-list', p);
  items.forEach(x => {
    const lb = el('label', '', `<input type="checkbox"${st[f].has(x.i) ? ' checked' : ''}><span>${x.n}</span>`);
    lb.querySelector('input').onchange = e => { e.target.checked ? st[f].add(x.i) : st[f].delete(x.i); st.pick = null; render(); };
    list.append(lb);
  });
  return p;
}
function rText(vis) {
  const p = panel(vis, 'txt'); p.innerHTML = vis.text; if (vis.w > 1800) p.classList.add('hd'); return p;
}

/* ---------- Render general ---------- */
const stage = $('#stage');
function render() {
  const pg = PAGES[cur], st = state[cur];
  const ctxs = { all: buildCtx(pg, st, false), pick: buildCtx(pg, st, true) };
  const sc = $('#stage').scrollTop;
  stage.replaceChildren();
  const hd = panel({ x: 0, y: 20, w: 1920, h: 74 }, 'txt hd'); hd.innerHTML = `<span style="color:${pg.title[1]};font-size:${u(pg.title[2] * 1.33)}">${pg.title[0]}</span>`; stage.append(hd);
  pg.v.forEach((vis, k) => {
    const vid = pg.id + k;
    let n;
    switch (vis.t) {
      case 'text': n = rText(vis); break; case 'slicer': n = rSlicer(vis, cur, pg); break; case 'bar': n = rBar(vis, ctxs, cur, vid); break;
      case 'table': n = rTable(vis, ctxs, cur, vid); break; case 'pie': n = rPie(vis, ctxs, cur, vid); break; case 'card': n = rCard(vis, ctxs, cur); break;
      case 'crit': n = rCrit(vis, ctxs); break; case 'volt': n = rVolt(vis, ctxs); break;
    }
    stage.append(n);
  });
  const nIn = ctxs.pick.rv.length;
  $('#status').textContent = `${ctxs.all.rv.length.toLocaleString('es-CO')} de ${N.toLocaleString('es-CO')} lecturas en el contexto de filtros` + (st.pick != null ? ` · Selección: ${label('Equipo', st.pick)}` : '');
  $('#clear').hidden = !(st.Equipo.size || st.Seccion.size || st.Variable.size || st.pick != null);
  renderDax(pg);
}
function renderDax(pg) {
  const used = new Set(); pg.v.forEach(v => { (v.ms || []).forEach(m => used.add(m)); (v.cols || []).forEach(c => c.m && used.add(c.m)); if (v.m) used.add(v.m); });
  if (pg.id === 'ranking') used.add('Conteo_FueraRango');
  $('#dax').innerHTML = [...used].filter(m => DAX[m]).map(m => `<div><b>${m}</b> = <code>${DAX[m].replace(/</g, '&lt;')}</code></div>`).join('');
}
function fit() { stage.style.setProperty('--u', (stage.clientWidth / 1920) + 'px'); }

/* ---------- Pestañas y vista Proyecto ---------- */
function tabs() {
  const box = $('#tabs');
  [...PAGES.map(p => p.name), 'Proyecto'].forEach((n, i) => {
    const b = el('button', 'tab', n); b.onclick = () => go(i); box.append(b);
  });
}
function go(i) {
  document.querySelectorAll('.tab').forEach((b, j) => b.classList.toggle('on', j === i));
  const proj = i === PAGES.length;
  $('#dash').hidden = proj; $('#proj').hidden = !proj;
  if (!proj) { cur = i; fit(); render(); }
  history.replaceState(null, '', '#' + (proj ? 'proyecto' : PAGES[i].id));
}
const HU = [
  ['HU-01', 'Vista general de climatización y potencia', 'Páginas Aires y Temperaturas y Potencia y Eléctrico con indicadores por variable.', 'Implementado'],
  ['HU-02', 'Filtrar por equipo, sección y variable', 'Los segmentadores actualizan los visuales de la página (menos de 3 s).', 'Implementado · tiempo por medir'],
  ['HU-03', 'Identificar lecturas fuera de umbral', 'Temperatura fuera de 18–27 °C, tensión fuera de 108–132 V, frecuencia fuera de 59,5–60,5 Hz.', 'Reglas configuradas'],
  ['HU-04', 'Ranking de equipos con más alertas', 'El Top 5 coincide con un conteo independiente.', 'Verificado'],
  ['HU-05', 'Carga de UPS y balance por fase', 'Salida/entrada mayor a 100 % resaltada; balance A/B/C en gráfico circular.', 'Implementado'],
  ['HU-06', 'Actualizar con un archivo exportado', 'Cambiar la ruta del origen y actualizar (manual, no tiempo real).', 'Por probar'],
  ['HU-07', 'Consultar desde un navegador', 'Esta página, publicada en GitHub Pages.', 'Entregado · publicación por registrar']
];
const TESTS = [['PF-01', 'Abrir el tablero y ver las tres páginas'], ['PF-02', 'Usar segmentadores de equipo, sección y variable'], ['PF-03', 'Comprobar umbrales con datos dentro y fuera de rango'], ['PF-04', 'Comparar el Top 5 con el conteo independiente'], ['PF-05', 'Revisar carga de UPS y balance por fase'], ['PF-06', 'Actualizar el origen con un archivo posterior'], ['PF-07', 'Medir tiempos y probar con usuario externo'], ['PF-08', 'Abrir esta página en escritorio y móvil']];
function project() {
  $('#hu').append(...HU.map(h => el('article', 'card', `<span class="badge">${h[3]}</span><h3>${h[0]} · ${h[1]}</h3><p>${h[2]}</p>`)));
  // Verificación automática del Top 5 (conteo independiente)
  const cnt = new Map(); for (let i = 0; i < N; i++) if (DE[i] === DEG && V[i] != null && (V[i] < 18 || V[i] > 27)) cnt.set(E[i], (cnt.get(E[i]) || 0) + 1);
  const top = [...cnt].sort((a, b) => b[1] - a[1]).slice(0, 5), doc = [360, 280, 236, 217, 162];
  const board = series(buildCtx(PAGES[2], state[2], false), { cat: 'Equipo' }, 'Alertas_Totales', null, false, 5);
  $('#verif').innerHTML = '<tr><th>#</th><th>Equipo</th><th>Tablero (Alertas_Totales)</th><th>Conteo independiente</th><th>Documento</th><th>Coincide</th></tr>' + top.map((t, i) => {
    const b = board[i]; const ok = b && b.v === t[1] && t[1] === doc[i];
    return `<tr><td>${i + 1}</td><td>${label('Equipo', t[0])}</td><td>${b ? b.v : ''}</td><td>${t[1]}</td><td>${doc[i]}</td><td>${ok ? 'Sí' : 'No'}</td></tr>`;
  }).join('');
  let done = {}; try { done = JSON.parse(localStorage.getItem('pf')) || {}; } catch {}
  const list = $('#tests'), upd = () => { const n = TESTS.filter(t => done[t[0]]).length; $('#bar').style.width = n / TESTS.length * 100 + '%'; $('#ptxt').textContent = `${n} de ${TESTS.length} pruebas marcadas`; };
  TESTS.forEach(([id, t]) => {
    const lb = el('label', '', `<input type="checkbox"${done[id] ? ' checked' : ''}><span><b>${id}</b> — ${t}</span>`);
    lb.querySelector('input').onchange = e => { done[id] = e.target.checked; try { localStorage.setItem('pf', JSON.stringify(done)); } catch {} upd(); };
    const li = el('li'); li.append(lb); list.append(li);
  });
  upd();
}

$('#clear').onclick = () => { const s = state[cur]; s.Equipo.clear(); s.Seccion.clear(); s.Variable.clear(); s.pick = null; s.pickSrc = null; render(); };
tabs(); project();
if (POWERBI_URL) { const a = $('#pbiLink'); a.href = POWERBI_URL; a.target = '_blank'; a.hidden = false; }
addEventListener('resize', fit);
const h = location.hash.slice(1); const i0 = h === 'proyecto' ? PAGES.length : Math.max(0, PAGES.findIndex(p => p.id === h));
go(i0);
