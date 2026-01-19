"""
Database models for Library Management System
"""
from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import date

class Book(Base):
    """
    Book model representing books in the library
    """
    __tablename__ = "books"
    
    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    category = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False, default=0)
    
    # Relationship with issued books
    issued_records = relationship("IssueRecord", back_populates="book")


class IssueRecord(Base):
    """
    IssueRecord model representing book issue/return transactions
    """
    __tablename__ = "issue_records"
    
    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, nullable=False)
    book_id = Column(String, ForeignKey("books.book_id"), nullable=False)
    issue_date = Column(Date, nullable=False, default=date.today)
    return_date = Column(Date, nullable=True)
    status = Column(String, nullable=False, default="issued")  # issued or returned
    
    # Relationship with book
    book = relationship("Book", back_populates="issued_records")
