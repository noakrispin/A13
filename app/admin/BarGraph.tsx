'use client'

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
    data: GraphData[];
}

type GraphData = {
    day: string;
    date: string;
    totalAmount: number;
};

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
    // Define the order of the days of the week
    const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Sort the data according to the dayOrder
    const sortedData = data.sort((a, b) => {
        return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    });

    // Extract labels and amounts from sorted data
    const labels = sortedData.map(item => item.day);
    const amounts = sortedData.map(item => item.totalAmount);

    // Define chart data
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Sale Amount',
                data: amounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    // Define chart options
    const options = {
        scales: {
            y: {
                ticks: {
                    color: 'white' // Y-axis tick text color
                },
                beginAtZero: true
            },
            x: {
                ticks: {
                    color: 'white' // X-axis tick text color
                }
            }
        },
        plugins: {
            legend: {
                display: false // Hide legend
            },
            tooltip: {
                displayColors: false // Hide tooltip colors
            }
        },
        responsive: true,
        maintainAspectRatio: false, // Allow chart to adjust size
        backgroundColor: 'white' // Set the background color to white
    };

    // Return the Bar component with sorted data and options
    return <Bar data={chartData} options={options} />;
};

export default BarGraph;
