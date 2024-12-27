const generateBillForm = document.getElementById('generateBillForm');
const patientSelect = document.getElementById('patientSelect');
const amountInput = document.getElementById('amount');
const billingTableBody = document.querySelector('#billingTable tbody');

// Fetch and populate patient list
async function fetchPatients() {
    try {
        const response = await fetch('/api/patients');
        if (!response.ok) throw new Error('Failed to fetch patients');
        const patients = await response.json();

        patientSelect.innerHTML = '<option value="" disabled selected>Select Patient</option>';
        if (Array.isArray(patients)) {
            patients.forEach(patient => {
                const option = document.createElement('option');
                option.value = patient.id;
                option.textContent = patient.name;
                patientSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
}

// Fetch and display billing records
async function fetchBillingRecords() {
    try {
        const response = await fetch('/api/billing');
        if (!response.ok) throw new Error('Failed to fetch billing records');
        const bills = await response.json();

        billingTableBody.innerHTML = '';
        bills.forEach(bill => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bill.patient_name}</td>
                <td>${Number(bill.amount).toFixed(2)}</td>
                <td>${new Date(bill.created_at).toLocaleString()}</td>
                <td><button class="delete-button" data-id="${bill.id}">Delete</button></td>
            `;
            billingTableBody.appendChild(row);
        });
        
    } catch (error) {
        console.error('Error fetching billing records:', error);
    }
}

// Add a new bill
generateBillForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const patientId = patientSelect.value;
    const amount = parseFloat(amountInput.value);
    if (!patientId || isNaN(amount)) {
        alert('Please fill in all fields.');
        return;
    }
    try {
        const response = await fetch('/api/billing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patient_id: patientId, amount }),
        });
        const result = await response.json();
        if (response.ok) {
            fetchBillingRecords();
            generateBillForm.reset();
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Error adding bill:', error);
    }
});

// Delete a bill
billingTableBody.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
        const billId = event.target.dataset.id;
        if (confirm('Are you sure you want to delete this bill?')) {
            try {
                const response = await fetch(`/api/billing/${billId}`, { method: 'DELETE' });
                const result = await response.json();
                if (response.ok) {
                    fetchBillingRecords();
                } else {
                    alert(result.error);
                }
            } catch (error) {
                console.error('Error deleting bill:', error);
            }
        }
    }
});

// Initialize
fetchPatients();
fetchBillingRecords();