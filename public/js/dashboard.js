document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('total-patients').textContent = 'Loading...';
    document.getElementById('appointments-today').textContent = 'Loading...';

    setTimeout(() => {
        document.getElementById('total-patients').textContent = 145;
        document.getElementById('appointments-today').textContent = 12;
    }, 1000);
});