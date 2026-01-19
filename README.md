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

Before you begin, ensure you have the following installed on your system:

- **Python 3.8 or higher** - [Download Python](https://www.python.org/downloads/)
- **pip** (Python package manager) - Usually comes with Python
- **Git** - [Download Git](https://git-scm.com/downloads)
- **A modern web browser** - Chrome, Firefox, Edge, or Safari

### Quick Start Guide

Follow these steps to get the Library Management System up and running on your local machine:

---

## 📥 Step 1: Clone the Repository

Open your terminal/command prompt and clone the repository:

```bash
git clone https://github.com/Prabhat9801/Library_Management_System.git
```

Navigate to the project directory:

```bash
cd Library_Management_System
```

---

## 🔧 Step 2: Backend Setup

### 2.1 Navigate to Backend Directory

```bash
cd backend
```

### 2.2 Create a Virtual Environment (Recommended)

**For Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**For macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt, indicating the virtual environment is active.

### 2.3 Install Backend Dependencies

Install all required Python packages:

```bash
pip install -r requirements.txt
```

This will install:
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- python-multipart

### 2.4 Start the Backend Server

Run the FastAPI server using Uvicorn:

```bash
uvicorn main:app --reload
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx]
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

✅ **Backend is now running at:** `http://localhost:8000`

📚 **API Documentation available at:** `http://localhost:8000/docs`

> **Note:** Keep this terminal window open. The backend server must remain running for the frontend to work.

---

## 🎨 Step 3: Frontend Setup

### 3.1 Open a New Terminal

Open a **new** terminal/command prompt window (keep the backend server running in the previous terminal).

### 3.2 Navigate to Frontend Directory

From the project root directory:

```bash
cd frontend
```

### 3.3 Open the Application

You have **three options** to run the frontend:

#### **Option 1: Double-Click (Easiest)**
- Simply double-click on `index.html` in the `frontend` folder
- It will open in your default web browser

#### **Option 2: Right-Click Method**
- Right-click on `index.html`
- Select **"Open with"** → Choose your preferred browser

#### **Option 3: Command Line**

**For Windows:**
```bash
start index.html
```

**For macOS:**
```bash
open index.html
```

**For Linux:**
```bash
xdg-open index.html
```

#### **Option 4: Using a Local Server (Optional)**

For a more production-like environment, you can use Python's built-in HTTP server:

```bash
python -m http.server 3000
```

Then open your browser and navigate to: `http://localhost:3000`

---

## ✅ Step 4: Verify Installation

### 4.1 Check Backend

1. Open your browser and go to: `http://localhost:8000/docs`
2. You should see the FastAPI interactive documentation (Swagger UI)
3. Try the health check endpoint by clicking on `GET /` → **Try it out** → **Execute**
4. You should receive a response with status 200

### 4.2 Check Frontend

1. The home page should load with a purple gradient header
2. You should see navigation links: Home, Add Book, View Books, Issue Book, Return Book
3. All navigation links should work without errors

### 4.3 Test the Complete System

1. **Add a Book:**
   - Go to "Add Book" page
   - Fill in: Book ID: `B001`, Title: `Python Programming`, Author: `John Doe`, Category: `Technology`, Quantity: `5`
   - Click "Add Book"
   - You should see a success message

2. **View Books:**
   - Go to "View Books" page
   - You should see the book you just added in the table

3. **Issue a Book:**
   - Go to "Issue Book" page
   - Enter: Student Name: `Alice Smith`, Book ID: `B001`, Issue Date: (today's date)
   - Click "Issue Book"
   - The book quantity should decrease to 4

4. **Return a Book:**
   - Go to "Return Book" page
   - Find the issued book in the table
   - Click "Return Book"
   - The book quantity should increase back to 5

---

## 🛑 Stopping the Application

### Stop Backend Server
- Go to the terminal running the backend
- Press `Ctrl + C` (Windows/Linux) or `Cmd + C` (macOS)

### Stop Frontend
- Simply close the browser tab

### Deactivate Virtual Environment (if used)
```bash
deactivate
```

---

## 🔄 Running the Application Again

After the initial setup, you only need to:

1. **Start Backend:**
   ```bash
   cd backend
   # Activate virtual environment (if using one)
   venv\Scripts\activate  # Windows
   # or
   source venv/bin/activate  # macOS/Linux
   
   # Start server
   uvicorn main:app --reload
   ```

2. **Open Frontend:**
   - Double-click `frontend/index.html` or use any method from Step 3.3

---

## 📦 Project Structure After Setup

```
Library_Management_System/
├── backend/
│   ├── venv/                # Virtual environment (if created)
│   ├── main.py              # FastAPI application
│   ├── models.py            # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database configuration
│   ├── requirements.txt     # Python dependencies
│   └── library.db           # SQLite database (auto-created)
│
└── frontend/
    ├── index.html           # Home page
    ├── add-book.html        # Add book page
    ├── add-book.js          # Add book logic
    ├── view-books.html      # View books page
    ├── view-books.js        # View books logic
    ├── issue-book.html      # Issue book page
    ├── issue-book.js        # Issue book logic
    ├── return-book.html     # Return book page
    ├── return-book.js       # Return book logic
    └── styles.css           # Global styles
```

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

## 📌 Quick Reference Commands

### First Time Setup
```bash
# Clone repository
git clone https://github.com/Prabhat9801/Library_Management_System.git
cd Library_Management_System

# Setup backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload

# Open frontend (in new terminal)
cd frontend
start index.html  # Windows
open index.html  # macOS
xdg-open index.html  # Linux
```

### Daily Usage
```bash
# Start backend
cd backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
uvicorn main:app --reload

# Open frontend
Double-click frontend/index.html
```

### Important URLs
- **Frontend:** Open `frontend/index.html` in browser
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs
- **GitHub Repository:** https://github.com/Prabhat9801/Library_Management_System

---

**Built with ❤️ using FastAPI and Vanilla JavaScript**