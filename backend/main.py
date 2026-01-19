"""
FastAPI main application for Library Management System
"""
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from datetime import date

import models
import schemas
from database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Library Management System API",
    description="REST API for managing library books and issue records",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


# ============ Book Management APIs ============

@app.post("/api/books/", response_model=schemas.BookResponse, status_code=status.HTTP_201_CREATED)
def add_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    """
    Add a new book to the library
    """
    # Check if book_id already exists
    existing_book = db.query(models.Book).filter(models.Book.book_id == book.book_id).first()
    if existing_book:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Book with ID '{book.book_id}' already exists"
        )
    
    # Create new book
    db_book = models.Book(**book.model_dump())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    
    return db_book


@app.get("/api/books/", response_model=List[schemas.BookResponse])
def get_all_books(db: Session = Depends(get_db)):
    """
    Retrieve all books from the library
    """
    books = db.query(models.Book).all()
    return books


@app.get("/api/books/{book_id}", response_model=schemas.BookResponse)
def get_book(book_id: str, db: Session = Depends(get_db)):
    """
    Get a specific book by book_id
    """
    book = db.query(models.Book).filter(models.Book.book_id == book_id).first()
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book with ID '{book_id}' not found"
        )
    return book


# ============ Issue Book APIs ============

@app.post("/api/issue/", response_model=schemas.IssueRecordResponse, status_code=status.HTTP_201_CREATED)
def issue_book(issue_request: schemas.IssueBookRequest, db: Session = Depends(get_db)):
    """
    Issue a book to a student
    """
    # Check if book exists
    book = db.query(models.Book).filter(models.Book.book_id == issue_request.book_id).first()
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book with ID '{issue_request.book_id}' not found"
        )
    
    # Check if book is available
    if book.quantity <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Book '{book.title}' is currently out of stock"
        )
    
    # Create issue record
    issue_record = models.IssueRecord(
        student_name=issue_request.student_name,
        book_id=issue_request.book_id,
        issue_date=issue_request.issue_date,
        status="issued"
    )
    
    # Decrease book quantity
    book.quantity -= 1
    
    db.add(issue_record)
    db.commit()
    db.refresh(issue_record)
    
    return issue_record


@app.get("/api/issued-books/", response_model=List[schemas.IssueRecordWithBook])
def get_issued_books(db: Session = Depends(get_db)):
    """
    Get all issued books (not yet returned)
    """
    issued_records = db.query(models.IssueRecord).filter(
        models.IssueRecord.status == "issued"
    ).all()
    
    # Prepare response with book details
    result = []
    for record in issued_records:
        book = db.query(models.Book).filter(models.Book.book_id == record.book_id).first()
        result.append({
            "id": record.id,
            "student_name": record.student_name,
            "book_id": record.book_id,
            "issue_date": record.issue_date,
            "return_date": record.return_date,
            "status": record.status,
            "book_title": book.title if book else "Unknown",
            "book_author": book.author if book else "Unknown"
        })
    
    return result


@app.get("/api/all-issue-records/", response_model=List[schemas.IssueRecordWithBook])
def get_all_issue_records(db: Session = Depends(get_db)):
    """
    Get all issue records (both issued and returned)
    """
    all_records = db.query(models.IssueRecord).all()
    
    # Prepare response with book details
    result = []
    for record in all_records:
        book = db.query(models.Book).filter(models.Book.book_id == record.book_id).first()
        result.append({
            "id": record.id,
            "student_name": record.student_name,
            "book_id": record.book_id,
            "issue_date": record.issue_date,
            "return_date": record.return_date,
            "status": record.status,
            "book_title": book.title if book else "Unknown",
            "book_author": book.author if book else "Unknown"
        })
    
    return result


# ============ Return Book APIs ============

@app.put("/api/return/{issue_record_id}", response_model=schemas.IssueRecordResponse)
def return_book(issue_record_id: int, db: Session = Depends(get_db)):
    """
    Return a book and update quantity
    """
    # Find the issue record
    issue_record = db.query(models.IssueRecord).filter(
        models.IssueRecord.id == issue_record_id
    ).first()
    
    if not issue_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Issue record with ID {issue_record_id} not found"
        )
    
    # Check if already returned
    if issue_record.status == "returned":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This book has already been returned"
        )
    
    # Update issue record
    issue_record.return_date = date.today()
    issue_record.status = "returned"
    
    # Increase book quantity
    book = db.query(models.Book).filter(models.Book.book_id == issue_record.book_id).first()
    if book:
        book.quantity += 1
    
    db.commit()
    db.refresh(issue_record)
    
    return issue_record


# ============ Health Check ============

@app.get("/")
def root():
    """
    Root endpoint - API health check
    """
    return {
        "message": "Library Management System API",
        "status": "running",
        "version": "1.0.0"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
