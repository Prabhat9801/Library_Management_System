/**
 * Return Book JavaScript
 * Handles book return operations and displays return history
 */

// API Base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Get DOM elements
const alertContainer = document.getElementById('alertContainer');
const issuedBooksTableBody = document.getElementById('issuedBooksTableBody');
const loadingSpinner = document.getElementById('loadingSpinner');
const emptyMessage = document.getElementById('emptyMessage');
const issuedBooksTable = document.getElementById('issuedBooksTable');
const returnHistoryTableBody = document.getElementById('returnHistoryTableBody');
const historyLoadingSpinner = document.getElementById('historyLoadingSpinner');
const historyEmptyMessage = document.getElementById('historyEmptyMessage');
const returnHistoryTable = document.getElementById('returnHistoryTable');

/**
 * Display alert message
 */
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;

    alertContainer.innerHTML = '';
    alertContainer.appendChild(alertDiv);

    alertDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => {
        alertDiv.classList.remove('show');
    }, 5000);
}

/**
 * Format date
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Handle book return
 */
async function returnBook(recordId, studentName, bookTitle) {
    if (!confirm(`Are you sure you want to return this book?\n\nStudent: ${studentName}\nBook: ${bookTitle}`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/return/${recordId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            showAlert(`Book returned successfully!`, 'success');
            loadIssuedBooks();
            loadReturnHistory();
        } else {
            showAlert(data.detail || 'Failed to return book', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Failed to connect to the server.', 'error');
    }
}

/**
 * Load issued books
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
 * Display issued books
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
            <td>
                <button class="btn btn-success" onclick="returnBook(${record.id}, '${record.student_name}', '${record.book_title}')">
                    Return Book
                </button>
            </td>
        `;

        issuedBooksTableBody.appendChild(row);
    });
}

/**
 * Load return history
 */
async function loadReturnHistory() {
    historyLoadingSpinner.style.display = 'block';
    returnHistoryTable.style.display = 'none';
    historyEmptyMessage.style.display = 'none';

    try {
        const response = await fetch(`${API_BASE_URL}/all-issue-records/`);

        if (!response.ok) {
            throw new Error('Failed to fetch return history');
        }

        const allRecords = await response.json();
        const returnedBooks = allRecords.filter(record => record.status === 'returned');

        historyLoadingSpinner.style.display = 'none';

        if (returnedBooks.length === 0) {
            historyEmptyMessage.style.display = 'block';
        } else {
            returnHistoryTable.style.display = 'table';
            displayReturnHistory(returnedBooks);
        }

    } catch (error) {
        console.error('Error:', error);
        historyLoadingSpinner.style.display = 'none';
    }
}

/**
 * Display return history
 */
function displayReturnHistory(returnedBooks) {
    returnHistoryTableBody.innerHTML = '';

    returnedBooks.forEach(record => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.student_name}</td>
            <td>${record.book_title}</td>
            <td>${formatDate(record.issue_date)}</td>
            <td>${formatDate(record.return_date)}</td>
            <td><span class="status-badge status-returned">${record.status}</span></td>
        `;

        returnHistoryTableBody.appendChild(row);
    });
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadIssuedBooks();
    loadReturnHistory();
});
