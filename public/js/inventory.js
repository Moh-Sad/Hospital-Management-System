document.addEventListener('DOMContentLoaded', () => {
    const inventoryTableBody = document.querySelector('#inventoryTable tbody');
    const addInventoryForm = document.getElementById('addInventoryForm');
    const itemNameInput = document.getElementById('itemName');
    const quantityInput = document.getElementById('quantity');

    // Function to fetch all inventory items
    const fetchInventory = async () => {
        try {
            const response = await fetch('/api/inventory');
            const items = await response.json();

            // Clear the table before adding rows
            inventoryTableBody.innerHTML = '';

            items.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.item_name}</td>
                    <td>${item.quantity}</td>
                    <td>
                        <button class="update-btn" data-id="${item.id}">Update</button>
                        <button class="delete-btn" data-id="${item.id}">Delete</button>
                    </td>
                `;
                inventoryTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Failed to fetch inventory:', error);
        }
    };

    // Function to add a new inventory item
    addInventoryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const itemName = itemNameInput.value.trim();
        const quantity = parseInt(quantityInput.value.trim(), 10);

        if (!itemName || isNaN(quantity)) {
            alert('Please fill out all fields correctly.');
            return;
        }

        try {
            const response = await fetch('/api/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_name: itemName, quantity }),
            });

            if (response.ok) {
                fetchInventory();
                addInventoryForm.reset();
            } else {
                alert('Failed to add item.');
            }
        } catch (error) {
            console.error('Failed to add inventory item:', error);
        }
    });

    // Function to handle update and delete buttons
    inventoryTableBody.addEventListener('click', async (event) => {
        const target = event.target;
        const id = target.dataset.id;

        if (target.classList.contains('delete-btn')) {
            // Delete item
            if (confirm('Are you sure you want to delete this item?')) {
                try {
                    const response = await fetch(`/api/inventory/${id}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        fetchInventory();
                    } else {
                        alert('Failed to delete item.');
                    }
                } catch (error) {
                    console.error('Failed to delete inventory item:', error);
                }
            }
        } else if (target.classList.contains('update-btn')) {
            // Update item
            const newName = prompt('Enter new item name:');
            const newQuantity = prompt('Enter new quantity:');

            if (newName && !isNaN(parseInt(newQuantity, 10))) {
                try {
                    const response = await fetch(`/api/inventory/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ item_name: newName, quantity: parseInt(newQuantity, 10) }),
                    });

                    if (response.ok) {
                        fetchInventory();
                    } else {
                        alert('Failed to update item.');
                    }
                } catch (error) {
                    console.error('Failed to update inventory item:', error);
                }
            } else {
                alert('Invalid inputs. Update cancelled.');
            }
        }
    });

    // Fetch inventory items on page load
    fetchInventory();
});