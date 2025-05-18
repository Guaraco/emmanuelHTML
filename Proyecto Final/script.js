
fetch('ejercicios.json')
  .then(response => response.json())
  .then(data => {
    const menu = document.getElementById('menu');
    data.ejercicios.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.url;
        a.target = '_blank';
        a.textContent = item.titulo;
        li.appendChild(a);
        menu.appendChild(li);
    });
  })
  .catch(error => console.error('Error cargando ejercicios:', error));
