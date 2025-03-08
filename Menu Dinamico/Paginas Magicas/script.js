fetch('libros.json')
  .then(response => response.json())
  .then(data => {
    const contenedorLibros = document.getElementById('contenedor-libros');
    data.libros.forEach(libro => {
      const divLibro = document.createElement('div');
      divLibro.classList.add('libro');
      divLibro.innerHTML = `
        <img src="${libro.imagen}" alt="${libro.nombre}">
        <h3>${libro.nombre}</h3>
        <p>Precio: ${libro.precio}</p>
        <a href="#" class="boton-comprar">Comprar</a>
      `;
      contenedorLibros.appendChild(divLibro);
    });
  })
  .catch(error => console.error('Error al cargar los datos:', error));
