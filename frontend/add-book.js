/**
 * Add Book JavaScript
 * Handles form submission for adding new books
 */

// API Base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Get form element
const addBookForm = document.getElementById('addBookForm');
const alertContainer = document.getElementById('alertContainer');

/**
 * Display alert message
 */
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alertDiv);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
    }, 5000);
}

/**
 * Handle form submission
 */
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        book_id: document.getElementById('bookId').value.trim(),
        title: document.getElementById('title').value.trim(),
        author: document.getElementById('author').value.trim(),
        category: document.getElementById('category').value.trim(),
        quantity: parseInt(document.getElementById('quantity').value)
    };
    
    // Validate quantity
    if (formData.quantity < 0) {
        showAlert('Quantity cannot be negative!', 'error');
        return;
    }
    
    try {
        // Send POST request to API
        const response = await fetch(`${API_BASE_URL}/books/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Success
            showAlert(`Book "${data.title}" added successfully!`, 'success');
            addBookForm.reset();
        } else {
            // Error from API
            showAlert(data.detail || 'Failed to add book', 'error');
        }
    } catch (error) {
        // Network or other error
        console.error('Error:', error);
        showAlert('Failed to connect to the server. Please ensure the backend is running.', 'error');
    }
});

/**
 * Reset alert when form is reset
 */
addBookForm.addEventListener('reset', () => {
    alertContainer.innerHTML = '';
});
