document.addEventListener('DOMContentLoaded', () => {
    // Select elements where data will be displayed
    const totalPatientsElement = document.getElementById('total-patients');
    const appointmentsTodayElement = document.getElementById('appointments-today');

    // Display loading text
    totalPatientsElement.textContent = 'Loading...';
    appointmentsTodayElement.textContent = 'Loading...';

    // Fetch dashboard metrics from the backend
    fetch('/api/dashboard/metrics')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update the dashboard with fetched data
            totalPatientsElement.textContent = data.totalPatients;
            appointmentsTodayElement.textContent = data.appointmentsToday;
        })
        .catch(error => {
            console.error('Error fetching dashboard metrics:', error);
            totalPatientsElement.textContent = 'Error loading data';
            appointmentsTodayElement.textContent = 'Error loading data';
        });
});