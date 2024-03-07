// // Example Data

// const topicsData = {
//     "Topic 1": 8,
//     "Topic 2": 5,
//     "Topic 3": 3,
// };


// import function updateBarGraph() {
//     const container = document.getElementById('chartContainer');
//     container.innerHTML = '';

//     for (const topic in topicsData) {
//         const bar = document.createElement('div');
//         bar.className = 'bar';
//         bar.title = `${topic}: ${topicsData[topic]}`;

//         container.appendChild(bar);
//     }
// }

// updateBarGraph();

// document.getElementById('chartContainer').addEventListener('click', function (event) {
//     if (event.target.classList.contains('bar')) {
//         const topic = event.target.title.split(':')[0].trim();
//         topicsData[topic] += 1;
//         updateBarGraph();
//     }
// });


document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/topCaredArticles');
    const data = await response.json();

    const titles = data.map(article => article.title);
    const clickCounts = data.map(article => article.clickCount);

    const chartContainer = document.getElementById('chartContainer');

    const topTopics = chartContainer.getContext('2d');
    new Chart(topTopics, {
        type: 'bar',
        data: {
            labels: titles,
            datasets: [{
                label: 'Number of Clicks',
                data: clickCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});