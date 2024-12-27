// Function to load patients and display them in the table
function loadPatients() {
    fetch('/api/patients')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('patientTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';  // Clear existing rows

        data.patients.forEach(patient => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = patient.name;
            row.insertCell(1).textContent = patient.age;
            row.insertCell(2).textContent = patient.contact;

            // Add delete button in the last column
            const deleteCell = row.insertCell(3);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('button');
            deleteButton.onclick = function () {
                deletePatient(patient.id);
            };
            deleteCell.appendChild(deleteButton);
        });
    })
    .catch(error => {
        console.error('Error loading patients:', error);
    });
}

// Function to handle deleting a patient
function deletePatient(patientId) {
    fetch(`/api/patients/${patientId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Patient deleted successfully!');
        loadPatients();  // Refresh the patient list after deletion
    })
    .catch(error => {
        console.error('Error deleting patient:', error);
        alert('Error deleting patient');
    });
}

// Load the patient list when the page loads
window.onload = loadPatients;
