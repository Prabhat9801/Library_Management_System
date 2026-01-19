/**
 * Issue Book JavaScript
 * Handles issuing books to students and displaying issued books
 */

// API Base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Get DOM elements
const issueBookForm = document.getElementById('issueBookForm');
const alertContainer = document.getElementById('alertContainer');
const issuedBooksTableBody = document.getElementById('issuedBooksTableBody');
const loadingSpinner = document.getElementById('loadingSpinner');
const emptyMessage = document.getElementById('emptyMessage');
const issuedBooksTable = document.getElementById('issuedBooksTable');

/**
 * Set today's date as default
 */
document.getElementById('issueDate').valueAsDate = new Date();

/**
 * Display alert message
 */
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;

    alertContainer.innerHTML = '';
    alertContainer.appendChild(alertDiv);

    // Scroll to alert
    alertDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => {
        alertDiv.classList.remove('show');
    }, 5000);
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Handle form submission
 */
issueBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        student_name: document.getElementById('studentName').value.trim(),
        book_id: document.getElementById('bookId').value.trim(),
        issue_date: document.getElementById('issueDate').value
    };

    try {
        // Send POST request to API
        const response = await fetch(`${API_BASE_URL}/issue/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            // Success
            showAlert(`Book issued successfully to ${data.student_name}!`, 'success');
            issueBookForm.reset();
            document.getElementById('issueDate').valueAsDate = new Date();

            // Reload issued books list
            loadIssuedBooks();
        } else {
            // Error from API
            showAlert(data.detail || 'Failed to issue book', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Failed to connect to the server. Please ensure the backend is running.', 'error');
    }
});

/**
 * Load issued books from API
 */
async function loadIssuedBooks() {
    loadingSpinner.style.display = 'block';
    issuedBooksTable.style.display = 'none';
    emptyMessage.style.display = 'none';

    try {
        const response = await fetch(`${API_BASE_URL}/issued-books/`);

        if (!response.ok) {
            throw new Error('Failed to fetch issued books');
        }

        const issuedBooks = await response.json();

        loadingSpinner.style.display = 'none';

        if (issuedBooks.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            issuedBooksTable.style.display = 'table';
            displayIssuedBooks(issuedBooks);
        }

    } catch (error) {
        console.error('Error:', error);
        loadingSpinner.style.display = 'none';
        showAlert('Failed to load issued books.', 'error');
    }
}

/**
 * Display issued books in table
 */
function displayIssuedBooks(issuedBooks) {
    issuedBooksTableBody.innerHTML = '';

    issuedBooks.forEach(record => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${record.id}</td>
            <td><strong>${record.student_name}</strong></td>
            <td>${record.book_id}</td>
            <td>${record.book_title}</td>
            <td>${record.book_author}</td>
            <td>${formatDate(record.issue_date)}</td>
            <td><span class="status-badge status-issued">${record.status}</span></td>
        `;

        issuedBooksTableBody.appendChild(row);
    });
}

/**
 * Reset alert when form is reset
 */
issueBookForm.addEventListener('reset', () => {
    alertContainer.innerHTML = '';
});

// Load issued books when page loads
document.addEventListener('DOMContentLoaded', loadIssuedBooks);
