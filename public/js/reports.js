document.addEventListener('DOMContentLoaded', () => {
    const ctx1 = document.getElementById('patientsChart').getContext('2d');
    const ctx2 = document.getElementById('appointmentsChart').getContext('2d');

    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                label: 'Number of Patients',
                data: [50, 75, 100, 125],
                backgroundColor: 'rgba(0, 123, 255, 0.6)',
            }],
        },
    });

    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [{
                label: 'Daily Appointments',
                data: [10, 20, 15, 30, 25],
                backgroundColor: 'rgba(40, 167, 69, 0.6)',
            }],
        },
    });
});
