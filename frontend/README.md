# Personal Finance Assistant

A full-stack application to track, manage, and visualize financial transactions. Users can create income/expense entries, view transaction lists with pagination, visualize expenses by category, and extract transactions from uploaded receipts or PDFs.

## Features
- User registration and login with JWT authentication (multi-user support).
- Create, list, and delete transactions with date range filtering and pagination.
- Pie chart for income vs. expense summary.
- Upload receipts (images) or PDFs to extract transactions.
- Backend APIs with MongoDB persistence.
- Responsive UI styled with vanilla CSS.

## Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Tesseract.js (for image-based receipt OCR)
- pdf-parse (for PDF text extraction)

## Setup Instructions

### Backend
1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone <repo-url>
   cd backend