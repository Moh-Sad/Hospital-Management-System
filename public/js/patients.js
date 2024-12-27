document.addEventListener('DOMContentLoaded', () => {
    const patientTableBody = document.querySelector('#patientTable tbody');

    const patients = [
        { name: 'John Doe', age: 35, contact: '123-456-7890' },
        { name: 'Jane Smith', age: 29, contact: '987-654-3210' },
    ];

    const renderPatients = () => {
        patientTableBody.innerHTML = '';
        patients.forEach((p) => {
            const row = `<tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.contact}</td>
            </tr>`;
            patientTableBody.innerHTML += row;
        });
    };

    renderPatients();

    document.getElementById('addPatientForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const contact = document.getElementById('contact').value;

        patients.push({ name, age, contact });
        renderPatients();
        e.target.reset();
    });
});