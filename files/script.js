// ============================================================
// Generador de Carta de Presentación
// Reglas: máx. 2 seleccionados por categoría, máx. 5 en total
// (la Especialidad es selección única y no cuenta en ese total)
// ============================================================

const MAX_POR_CATEGORIA = 2;
const MAX_TOTAL = 5;

const form = document.getElementById('form-carta');
const checkboxes = Array.from(form.querySelectorAll('.opciones input[type="checkbox"]'));
const contadorTotalEl = document.getElementById('contador-total');
const barraProgresoEl = document.getElementById('barra-progreso-fill');
const avisoEl = document.getElementById('aviso-limite');

// ----- Control de límites de selección -----

function contarSeleccionados() {
  return checkboxes.filter(cb => cb.checked).length;
}

function contarPorCategoria(categoria) {
  return checkboxes.filter(cb => cb.closest('.categoria').dataset.categoria === categoria && cb.checked).length;
}

// Deshabilita/habilita casillas según los límites alcanzados
function actualizarLimites() {
  const total = contarSeleccionados();
  contadorTotalEl.textContent = total;
  barraProgresoEl.style.width = `${(total / MAX_TOTAL) * 100}%`;

  checkboxes.forEach(cb => {
    if (cb.checked) {
      cb.disabled = false;
      return;
    }
    const categoria = cb.closest('.categoria').dataset.categoria;
    const llegoAlTotal = total >= MAX_TOTAL;
    const llegoAlTopeCategoria = contarPorCategoria(categoria) >= MAX_POR_CATEGORIA;
    cb.disabled = llegoAlTotal || llegoAlTopeCategoria;
  });

  if (total >= MAX_TOTAL) {
    mostrarAviso();
  }
}

function mostrarAviso() {
  avisoEl.classList.remove('oculto');
}

document.getElementById('cerrar-aviso').addEventListener('click', () => {
  avisoEl.classList.add('oculto');
});

checkboxes.forEach(cb => cb.addEventListener('change', () => {
  actualizarLimites();
  actualizarVistaPrevia();
}));

// ----- Utilidades de redacción -----

// Une una lista en formato natural: "a, b y c"
function unirLista(lista) {
  if (lista.length === 0) return '';
  if (lista.length === 1) return lista[0];
  return lista.slice(0, -1).join(', ') + ' y ' + lista[lista.length - 1];
}

// Devuelve el valor de un campo, o un placeholder entre corchetes si está vacío
function valorOPlaceholder(id, placeholder) {
  const valor = document.getElementById(id).value.trim();
  return valor || `[${placeholder}]`;
}

function formatearFecha(valorFecha) {
  if (!valorFecha) return '[FECHA]';
  const [anio, mes, dia] = valorFecha.split('-');
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${parseInt(dia, 10)} de ${meses[parseInt(mes, 10) - 1]} de ${anio}`;
}

// ----- Armado de la carta -----

function armarCarta() {
  const nombre = valorOPlaceholder('nombre', 'TU NOMBRE COMPLETO');
  const ciudadPais = valorOPlaceholder('ciudad-pais', 'CIUDAD, PAÍS');
  const telefono = valorOPlaceholder('telefono', 'TELÉFONO');
  const correo = valorOPlaceholder('correo', 'CORREO');

  const ciudadEnvio = valorOPlaceholder('ciudad-envio', 'CIUDAD');
  const fecha = formatearFecha(document.getElementById('fecha').value);

  const reclutadorNombre = document.getElementById('reclutador-nombre').value.trim();
  const reclutadorCargo = document.getElementById('reclutador-cargo').value.trim();
  const empresa = valorOPlaceholder('empresa-nombre', 'NOMBRE DE LA EMPRESA');
  const saludo = reclutadorNombre ? `Estimado/a ${reclutadorNombre}:` : 'Estimado/a responsable de Recursos Humanos:';

  const puesto = valorOPlaceholder('puesto', 'NOMBRE DEL PUESTO');
  const fuente = valorOPlaceholder('fuente-anuncio', 'FUENTE DEL ANUNCIO');

  const carrera = valorOPlaceholder('carrera', 'CARRERA');
  const universidad = valorOPlaceholder('universidad', 'UNIVERSIDAD');
  const especialidad = document.getElementById('especialidad').value;
  const fraseEspecialidad = especialidad ? `, con especialización en ${especialidad},` : '';

  // Listas técnicas combinadas (lenguajes + herramientas + tecnologías)
  const tecnicas = checkboxes
    .filter(cb => cb.checked && cb.closest('.categoria').dataset.categoria !== 'blandas')
    .map(cb => cb.value);
  const blandas = checkboxes
    .filter(cb => cb.checked && cb.closest('.categoria').dataset.categoria === 'blandas')
    .map(cb => cb.value);

  const listaTecnicas = tecnicas.length ? unirLista(tecnicas) : '[LENGUAJES/HERRAMIENTAS/TECNOLOGÍAS]';
  const listaBlandas = blandas.length ? unirLista(blandas) : '[HABILIDADES BLANDAS]';

  const practica = valorOPlaceholder('practica', 'PRÁCTICA, PASANTÍA O PROYECTO RELEVANTE');
  const motivacion = valorOPlaceholder('motivacion', 'QUÉ TE MOTIVA DE LA EMPRESA');
  const valor = valorOPlaceholder('valor', 'VALOR QUE OFRECES');

  return `${nombre}
${ciudadPais} | ${telefono} | ${correo}

${reclutadorNombre ? `${reclutadorNombre}\n${reclutadorCargo ? reclutadorCargo + '\n' : ''}${empresa}\n\n` : ''}${ciudadEnvio}, ${fecha}

${saludo}

Me dirijo a usted para postular al puesto de ${puesto}, publicado en ${fuente}. Como egresado/a de ${carrera} en ${universidad}${fraseEspecialidad} me interesa iniciar mi trayectoria profesional aportando mis conocimientos al equipo de ${empresa}.

Durante mi formación desarrollé conocimientos en ${listaTecnicas}, que reforcé a través de ${practica}. Entre mis habilidades blandas destacan ${listaBlandas}.

Me motiva especialmente ${motivacion} y considero que puedo aportar ${valor} a su equipo.

Adjunto mi currículum con más detalle sobre mi formación y habilidades. Quedo a su disposición para una entrevista donde pueda ampliar esta información.

Atentamente,
${nombre}`;
}

function actualizarVistaPrevia() {
  document.getElementById('carta-preview').textContent = armarCarta();
}

// Actualiza la vista previa con cualquier cambio en el formulario
form.addEventListener('input', actualizarVistaPrevia);
form.addEventListener('change', actualizarVistaPrevia);

// ----- Exportar / imprimir -----

document.getElementById('btn-pdf').addEventListener('click', () => {
  window.print();
});

// Primer render al cargar la página
actualizarVistaPrevia();
