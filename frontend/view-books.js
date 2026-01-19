/**
 * View Books JavaScript
 * Handles fetching and displaying all books
 */

// API Base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Get DOM elements
const booksTableBody = document.getElementById('booksTableBody');
const loadingSpinner = document.getElementById('loadingSpinner');
const alertContainer = document.getElementById('alertContainer');
const emptyMessage = document.getElementById('emptyMessage');
const booksTable = document.getElementById('booksTable');

/**
 * Display alert message
 */
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;

    alertContainer.innerHTML = '';
    alertContainer.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.classList.remove('show');
    }, 5000);
}

/**
 * Get status badge HTML
 */
function getStatusBadge(quantity) {
    if (quantity > 0) {
        return `<span class="status-badge status-available">Available (${quantity})</span>`;
    } else {
        return `<span class="status-badge status-unavailable">Out of Stock</span>`;
    }
}

/**
 * Load all books from API
 */
async function loadBooks() {
    // Show loading spinner
    loadingSpinner.style.display = 'block';
    booksTable.style.display = 'none';
    emptyMessage.style.display = 'none';
    alertContainer.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/books/`);

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        const books = await response.json();

        // Hide loading spinner
        loadingSpinner.style.display = 'none';

        if (books.length === 0) {
            // No books found
            emptyMessage.style.display = 'block';
        } else {
            // Display books in table
            booksTable.style.display = 'table';
            displayBooks(books);
        }

    } catch (error) {
        console.error('Error:', error);
        loadingSpinner.style.display = 'none';
        showAlert('Failed to load books. Please ensure the backend is running.', 'error');
    }
}

/**
 * Display books in table
 */
function displayBooks(books) {
    booksTableBody.innerHTML = '';

    books.forEach(book => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.book_id}</td>
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.quantity}</td>
            <td>${getStatusBadge(book.quantity)}</td>
        `;

        booksTableBody.appendChild(row);
    });
}

// Load books when page loads
document.addEventListener('DOMContentLoaded', loadBooks);
