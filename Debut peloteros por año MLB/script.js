// Datos simulados: Peloteros extranjeros que debutaron entre 2020 y 2025
const debutantesMLB = {
  "2020": 42,  // Número de peloteros extranjeros que debutaron en 2020
  "2021": 38,  // Número de peloteros extranjeros que debutaron en 2021
  "2022": 45,  // Número de peloteros extranjeros que debutaron en 2022
  "2023": 50,  // Número de peloteros extranjeros que debutaron en 2023
  "2024": 52,  // Número de peloteros extranjeros que debutaron en 2024
  "2025": 60   // Número de peloteros extranjeros que debutaron en 2025
};

let mlbChart;

// Genera y actualiza el gráfico de debutantes
function generateCharts(type = 'bar') {
  const years = Object.keys(debutantesMLB);
  const debutantes = Object.values(debutantesMLB);

  // Datos para el gráfico
  const chartData = {
    labels: years,
    datasets: [{
      label: 'Peloteros Extranjeros Debutantes',
      data: debutantes,
      backgroundColor: getColor(0),
      borderColor: getColor(0),
      borderWidth: 2,
      fill: type === 'bar', // Rellenar solo si es un gráfico de barras
      tension: type === 'line' ? 0.4 : 0, // Si es un gráfico de líneas, ajustar la curva
      pointRadius: type === 'line' ? 5 : 0 // Tamaño de los puntos en las líneas
    }]
  };

  // Si ya existe un gráfico, destruirlo antes de crear uno nuevo
  if (mlbChart) mlbChart.destroy();

  // Crear el gráfico
  mlbChart = new Chart(document.getElementById('mlbChart'), {
    type: type,  // El tipo de gráfico puede ser 'bar' o 'line'
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Peloteros Extranjeros en MLB',
          font: {
            size: 24
          }
        },
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 18
            }
          }
        },
        tooltip: {
          bodyFont: {
            size: 16
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            font: {
              size: 16
            }
          }
        }
      }
    }
  });
}

// Función para actualizar el tipo de gráfico
function updateCharts() {
  const type = document.getElementById('chartType').value;
  generateCharts(type);
}

// Función para asignar colores al gráfico
function getColor(index) {
  // Usamos colores más vivos y agradables
  const colors = ['#FF6347', '#4682B4', '#32CD32', '#FF4500']; // Rojo, Azul, Verde y Naranja
  return colors[index % colors.length];
}

// Inicializar el gráfico cuando la página se cargue
document.addEventListener('DOMContentLoaded', () => {
  generateCharts();  // Genera el gráfico inicial
});
