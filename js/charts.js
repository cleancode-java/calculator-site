let pieChart;
let barChart;

window.updatePieChart = function (data) {
    const values = [
        data["Income Tax"],
        data["NI 0%"],
        data["NI 6%"],
        data["NI 2%"]
    ];

    // якщо всі значення = 0 → не малюємо
    const sum = values.reduce((a, b) => a + b, 0);
    if (sum === 0) return;

    //  створюємо chart ПЕРШИЙ раз
    if (!pieChart) {
        const ctx = document.getElementById("myPieChartTax").getContext("2d");

        pieChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Income Tax", "NI 0%", "NI 6%", "NI 2%"],
                datasets: [{
                    data: values,
                    backgroundColor: [
                        "#ef4444",
                        "#3b82f6",
                        "#f59e0b",
                        "#10b981"
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "bottom" }
                }
            }
        });

        return;
    }

    // 🔹 якщо chart уже існує — просто оновлюємо
    pieChart.data.datasets[0].data = values;
    pieChart.update();
};

function updateBarChart(data) {
    const labels = ["Profit", "Income Tax", "NI 0%", "NI 6%", "NI 2%", "Total NI", "Net Income"];
    const values = [
        data.profit,
        data.incomeTax,
        data.niBreakdown.zeroRate.tax,
        data.niBreakdown.basicRate.tax,
        data.niBreakdown.higherRate.tax,
        data.ni,
        data.netIncome
    ];
    const colors = ["#3b82f6","#ef4444","#60a5fa","#f59e0b","#10b981","#065f46","#8b5cf6"]; // можна змінювати кольори

    const ctx = document.getElementById("myHorizontalBarChart").getContext("2d");

    if (!barChart) {
        barChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "GBP",
                    data: values,
                    backgroundColor: colors
                }]
            },
            options: {
                indexAxis: 'y', // горизонтальна
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { x: { beginAtZero: true } }
            }
        });
    } else {
        barChart.data.datasets[0].data = values;
        barChart.update();
    }
}


window.addEventListener('resize', () => {
    if (barChart) barChart.resize(); // принудительно перерисовываем canvas, це потрібно для роботи цієї діаграми в grid на index.html - щоб текст підтягувався вище коли змінюється розмір екрану
});
