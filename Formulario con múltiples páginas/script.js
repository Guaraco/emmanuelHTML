let formulario = {
  datosPersonales: {},
  familiares: [],
  condicionesSalud: [],
  internamientos: []
};

function siguientePagina(pagina) {
  document.querySelectorAll('#form > div').forEach((div) => {
    div.style.display = 'none';
  });
  document.getElementById(`pagina-${pagina}`).style.display = 'block';
}

function anteriorPagina(pagina) {
  siguientePagina(pagina);
}

function agregarFamiliar() {
  let nombre = prompt("Nombre del Familiar:");
  let parentesco = prompt("Parentesco:");
  let edad = prompt("Edad:");
  formulario.familiares.push({ nombre, parentesco, edad });
  actualizarLista('familiares-lista', formulario.familiares, ['nombre', 'parentesco', 'edad']);
}

function finalizarFamiliares() {
  if (formulario.familiares.length > 0) {
    alert("Registro de familiares finalizado.");
  } else {
    alert("Por favor, agregue al menos un familiar.");
  }
}

function agregarCondicion() {
  let enfermedad = prompt("Enfermedad:");
  let tiempo = prompt("Tiempo con la enfermedad:");
  let detalles = prompt("Detalles:");
  formulario.condicionesSalud.push({ enfermedad, tiempo, detalles });
  actualizarLista('condiciones-lista', formulario.condicionesSalud, ['enfermedad', 'tiempo', 'detalles']);
}

function agregarInternamiento() {
  let fecha = prompt("Fecha:");
  let centroMedico = prompt("Centro Médico:");
  let diagnostico = prompt("Diagnóstico:");
  formulario.internamientos.push({ fecha, centroMedico, diagnostico });
  actualizarLista('internamientos-lista', formulario.internamientos, ['fecha', 'centroMedico', 'diagnostico']);
}

function actualizarLista(id, lista, campos) {
  const contenedor = document.getElementById(id);
  contenedor.innerHTML = '';
  lista.forEach((item) => {
    const texto = campos.map(campo => item[campo]).join(' / ');
    contenedor.innerHTML += `<p>${texto}</p>`;
  });
}

function guardarDatos() {
  document.getElementById('resultado').textContent = JSON.stringify(formulario, null, 2);
  alert("¡Datos guardados con éxito!");
}

function consultarDatos() {
  alert("Datos Registrados:\n" + JSON.stringify(formulario, null, 2));
}

function limpiarFormulario() {
  formulario = {
    datosPersonales: {},
    familiares: [],
    condicionesSalud: [],
    internamientos: []
  };
  
  // Limpiar los campos visuales (opcional)
  document.querySelectorAll('input').forEach(input => input.value = '');
  document.querySelectorAll('select').forEach(select => select.value = '');
  
  document.getElementById('familiares-lista').innerHTML = '';
  document.getElementById('condiciones-lista').innerHTML = '';
  document.getElementById('internamientos-lista').innerHTML = '';
  document.getElementById('resultado').textContent = '';
  
  alert("Formulario limpio y listo para un nuevo registro.");
  
  // Volver a la primera página
  siguientePagina(1);
}
