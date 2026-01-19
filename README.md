# Library Management System

A complete Library Management System built with **FastAPI** (Python) backend and **HTML/CSS/JavaScript** frontend.

## 📋 Features

### Backend (FastAPI)
- ✅ RESTful API architecture
- ✅ SQLite database with SQLAlchemy ORM
- ✅ Pydantic models for data validation
- ✅ CORS enabled for frontend communication
- ✅ Proper error handling and status codes
- ✅ Well-organized folder structure

### Frontend (Vanilla JavaScript)
- ✅ Pure HTML, CSS, and JavaScript (no frameworks)
- ✅ Responsive and modern UI design
- ✅ Separate pages for each operation
- ✅ Dynamic data rendering with Fetch API
- ✅ Real-time alerts and notifications
- ✅ Clean and professional styling

## 🎯 Functionality

1. **Add Books** - Add new books with Book ID, Title, Author, Category, and Quantity
2. **View Books** - Browse all available books with their current stock status
3. **Issue Books** - Issue books to students with automatic quantity management
4. **Return Books** - Process book returns and update inventory automatically
5. **Track Records** - View all issued books and return history

## 📁 Project Structure

```
Library_Management_System/
├── backend/
│   ├── main.py              # FastAPI application with all endpoints
│   ├── models.py            # SQLAlchemy database models
│   ├── schemas.py           # Pydantic validation schemas
│   ├── database.py          # Database configuration
│   ├── requirements.txt     # Python dependencies
│   └── library.db           # SQLite database (created automatically)
│
└── frontend/
    ├── index.html           # Home page
    ├── add-book.html        # Add book page
    ├── add-book.js          # Add book JavaScript
    ├── view-books.html      # View books page
    ├── view-books.js        # View books JavaScript
    ├── issue-book.html      # Issue book page
    ├── issue-book.js        # Issue book JavaScript
    ├── return-book.html     # Return book page
    ├── return-book.js       # Return book JavaScript
    └── styles.css           # Global CSS styles
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- A modern web browser (Chrome, Firefox, Edge, etc.)

### Step 1: Install Backend Dependencies

Open a terminal/command prompt and navigate to the backend folder:

```bash
cd backend
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### Step 2: Run the Backend Server

Start the FastAPI server using Uvicorn:

```bash
uvicorn main:app --reload
```

You should see output like:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

The backend API is now running at: **http://localhost:8000**

You can access the interactive API documentation at: **http://localhost:8000/docs**

### Step 3: Open the Frontend

Open the frontend folder and double-click on **index.html** to open it in your default browser.

Alternatively, you can right-click on any HTML file and select "Open with" → your preferred browser.

**Important:** Make sure the backend server is running before using the frontend!

## 📖 Usage Guide

### 1. Adding a Book
1. Navigate to **Add Book** page
2. Fill in the book details:
   - Book ID (unique identifier, e.g., B001)
   - Title
   - Author
   - Category
   - Quantity
3. Click **Add Book**
4. You'll see a success message if the book is added

### 2. Viewing Books
1. Navigate to **View Books** page
2. All books in the library will be displayed in a table
3. You can see the availability status of each book
4. Click **Refresh Books** to reload the data

### 3. Issuing a Book
1. Navigate to **Issue Book** page
2. Enter:
   - Student Name
   - Book ID (must exist in the library)
   - Issue Date
3. Click **Issue Book**
4. The book quantity will automatically decrease
5. View currently issued books in the table below

### 4. Returning a Book
1. Navigate to **Return Book** page
2. Find the book in the "Books Pending Return" table
3. Click the **Return Book** button
4. Confirm the return
5. The book quantity will automatically increase
6. View the return history in the table below

## 🔌 API Endpoints

### Books
- `POST /api/books/` - Add a new book
- `GET /api/books/` - Get all books
- `GET /api/books/{book_id}` - Get a specific book

### Issue/Return
- `POST /api/issue/` - Issue a book to a student
- `GET /api/issued-books/` - Get all currently issued books
- `GET /api/all-issue-records/` - Get all issue records (issued + returned)
- `PUT /api/return/{issue_record_id}` - Return a book

### Health Check
- `GET /` - API health check

## 🗄️ Database Schema

### Books Table
- `id` - Primary key (auto-increment)
- `book_id` - Unique book identifier (string)
- `title` - Book title
- `author` - Book author
- `category` - Book category
- `quantity` - Available quantity

### Issue Records Table
- `id` - Primary key (auto-increment)
- `student_name` - Name of the student
- `book_id` - Foreign key to books table
- `issue_date` - Date when book was issued
- `return_date` - Date when book was returned (nullable)
- `status` - Status: "issued" or "returned"

## 🎨 Design Features

- **Modern Gradient UI** - Beautiful purple gradient theme
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Hover effects and transitions
- **Status Badges** - Color-coded status indicators
- **Loading States** - Spinner animations while fetching data
- **Alert System** - Success/error notifications
- **Clean Typography** - Professional and readable fonts

## 🛠️ Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation using Python type hints
- **Uvicorn** - ASGI server
- **SQLite** - Lightweight database

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **JavaScript (ES6+)** - Logic and API communication
- **Fetch API** - HTTP requests

## 📝 Notes

- The SQLite database (`library.db`) is created automatically when you first run the backend
- All data is stored locally in the database file
- The frontend uses the Fetch API to communicate with the backend
- CORS is enabled to allow cross-origin requests
- Form validation is implemented both on frontend and backend
- The system automatically manages book quantities when issuing/returning

## 🐛 Troubleshooting

### Backend won't start
- Make sure Python 3.8+ is installed
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check if port 8000 is already in use

### Frontend can't connect to backend
- Verify the backend server is running at http://localhost:8000
- Check browser console for error messages
- Ensure CORS is enabled in the backend (already configured)

### Database errors
- Delete `library.db` file and restart the backend to create a fresh database
- Check file permissions in the backend folder

## 👨‍💻 Development

To modify the project:

1. **Backend changes**: Edit files in the `backend/` folder
   - The server will auto-reload if you used the `--reload` flag
   
2. **Frontend changes**: Edit HTML/CSS/JS files in the `frontend/` folder
   - Simply refresh the browser to see changes

## 📄 License

This project is created for educational purposes as part of a Software Development Life Cycle (SDLC) project.

## 🎓 Project Context

This Library Management System was developed following the **Iterative Development Model** as part of understanding the phases of Software Development Life Cycle (SDLC):

1. **Requirements Gathering** - Identified library management needs
2. **Design** - Created database schema and API structure
3. **Development** - Built backend and frontend incrementally
4. **Testing** - Validated functionality and error handling
5. **Deployment** - Local deployment with clear instructions
6. **Maintenance** - Designed for easy updates and improvements

---

**Built with ❤️ using FastAPI and Vanilla JavaScript**