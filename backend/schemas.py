"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, Field, validator
from datetime import date
from typing import Optional

# ============ Book Schemas ============

class BookBase(BaseModel):
    """Base schema for Book with common fields"""
    book_id: str = Field(..., min_length=1, description="Unique book identifier")
    title: str = Field(..., min_length=1, description="Book title")
    author: str = Field(..., min_length=1, description="Book author")
    category: str = Field(..., min_length=1, description="Book category")
    quantity: int = Field(..., ge=0, description="Available quantity")
    
    @validator('quantity')
    def quantity_must_be_positive(cls, v):
        if v < 0:
            raise ValueError('Quantity must be non-negative')
        return v


class BookCreate(BookBase):
    """Schema for creating a new book"""
    pass


class BookResponse(BookBase):
    """Schema for book response with database ID"""
    id: int
    
    class Config:
        from_attributes = True


# ============ Issue Record Schemas ============

class IssueBookRequest(BaseModel):
    """Schema for issuing a book"""
    student_name: str = Field(..., min_length=1, description="Student name")
    book_id: str = Field(..., min_length=1, description="Book ID to issue")
    issue_date: Optional[date] = Field(default_factory=date.today, description="Issue date")
    
    @validator('student_name')
    def student_name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Student name cannot be empty')
        return v.strip()


class ReturnBookRequest(BaseModel):
    """Schema for returning a book"""
    issue_record_id: int = Field(..., gt=0, description="Issue record ID")
    return_date: Optional[date] = Field(default_factory=date.today, description="Return date")


class IssueRecordResponse(BaseModel):
    """Schema for issue record response"""
    id: int
    student_name: str
    book_id: str
    issue_date: date
    return_date: Optional[date]
    status: str
    
    class Config:
        from_attributes = True


class IssueRecordWithBook(IssueRecordResponse):
    """Schema for issue record with book details"""
    book_title: str
    book_author: str
    
    class Config:
        from_attributes = True
