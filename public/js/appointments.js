document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addAppointmentForm");
    const appointmentTableBody = document.getElementById("appointmentTable").getElementsByTagName("tbody")[0];
    const errorMessage = document.getElementById("errorMessage");

    // Fetch existing appointments on page load
    fetchAppointments();

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        errorMessage.textContent = ""; // Clear any previous errors

        const patientName = document.getElementById("patientName").value;
        const doctorName = document.getElementById("doctorName").value;
        const date = document.getElementById("date").value;

        // Validate the form fields
        if (!patientName || !doctorName || !date) {
            errorMessage.textContent = "All fields are required.";
            return;
        }

        // Create appointment object
        const newAppointment = { patientName, doctorName, date };

        // Send POST request to the server to add the appointment
        fetch("/api/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAppointment),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;
            } else {
                alert("Appointment added successfully!");
                form.reset();
                fetchAppointments(); // Refresh the appointment list
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            errorMessage.textContent = "Failed to add appointment. Please try again.";
        });
    });

    // Function to fetch appointments and display them in the table
    function fetchAppointments() {
        fetch("/api/appointments")
            .then((response) => response.json())
            .then((data) => {
                if (data.appointments) {
                    const appointments = data.appointments;
                    appointmentTableBody.innerHTML = ""; // Clear the table before adding new data

                    appointments.forEach((appointment) => {
                        const row = document.createElement("tr");

                        const patientCell = document.createElement("td");
                        patientCell.textContent = appointment.patientName;
                        row.appendChild(patientCell);

                        const doctorCell = document.createElement("td");
                        doctorCell.textContent = appointment.doctorName;
                        row.appendChild(doctorCell);

                        const dateCell = document.createElement("td");
                        dateCell.textContent = new Date(appointment.date).toLocaleString();
                        row.appendChild(dateCell);

                        // Add a delete button
                        const deleteCell = document.createElement("td");
                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = "Delete";
                        deleteButton.classList.add("button", "delete-btn");
                        deleteButton.onclick = function () {
                            deleteAppointment(appointment.appointmentId);
                        };
                        deleteCell.appendChild(deleteButton);
                        row.appendChild(deleteCell);

                        // Append the row to the table
                        appointmentTableBody.appendChild(row);
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    }

    // Function to delete an appointment
    function deleteAppointment(appointmentId) {
        fetch(`/api/appointments/${appointmentId}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                alert("Appointment deleted successfully!");
                fetchAppointments(); // Refresh the list after deletion
            }
        })
        .catch((error) => {
            console.error("Error deleting appointment:", error);
        });
    }
});
