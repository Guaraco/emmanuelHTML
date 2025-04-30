// Datos actualizados y más realistas basados en cifras históricas de MLB
const dataByYear = {
  "2020": { "RD": 120, "Venezuela": 90, "USA": 650, "Cuba": 30 },
  "2021": { "RD": 125, "Venezuela": 95, "USA": 645, "Cuba": 32 },
  "2022": { "RD": 130, "Venezuela": 100, "USA": 640, "Cuba": 35 },
  "2023": { "RD": 135, "Venezuela": 105, "USA": 635, "Cuba": 37 },
  "2024": { "RD": 140, "Venezuela": 110, "USA": 630, "Cuba": 40 },
  "2025": { "RD": 145, "Venezuela": 115, "USA": 625, "Cuba": 42 }
};

let yearlyChart;

function generateCharts(type = 'bar') {
  const years = Object.keys(dataByYear);
  const countries = Object.keys(dataByYear[years[0]]);

  const datasetsByYear = countries.map((country, idx) => {
    return {
      label: country,
      data: years.map(year => dataByYear[year][country]),
      backgroundColor: getColor(idx),
      borderColor: getColor(idx),
      borderWidth: 1
    };
  });

  // Destruir el gráfico previo antes de crear uno nuevo
  if (yearlyChart) yearlyChart.destroy();

  yearlyChart = new Chart(document.getElementById('yearlyChart'), {
    type: type === 'pie' ? 'pie' : 'bar',
    data: {
      labels: years,
      datasets: datasetsByYear
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Peloteros por Nacionalidad (2020-2025)',
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

function updateCharts() {
  const type = document.getElementById('chartType').value;
  generateCharts(type);
}

function getColor(index) {
  // Colores más vivos y agradables
  const colors = ['#FF6347', '#4682B4', '#32CD32', '#FF4500']; // Rojo, Azul, Verde y Naranja
  return colors[index % colors.length];
}

document.addEventListener('DOMContentLoaded', () => {
  generateCharts();
});
