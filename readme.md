Personal Finance Assistant
==========================

The Personal Finance Assistant is a full-stack web application designed to help users track, manage, and understand their financial activities. Users can log income and expenses, categorize transactions, view spending summaries through charts, and extract expenses from uploaded receipts  transaction histories. The application supports multiple users with secure authentication, pagination for transaction listings, and comprehensive API documentation via Swagger.

**Watch Demo:** [https://www.youtube.com/watch?v=example-demo](https://www.youtube.com/watch?v=example-demo)  
**Frontend Repository:** [https://github.com/yourusername/personal-finance-assistant-frontend](https://github.com/yourusername/personal-finance-assistant-frontend)  
**Backend Repository:** [https://github.com/yourusername/personal-finance-assistant-backend](https://github.com/yourusername/personal-finance-assistant-backend)


Features
--------

*   **Transaction Management**: Create, view, and delete income/expense transactions via a user-friendly web interface.
    
*   **Filtering and Pagination**: List transactions within a specified time range, filtered by type (income/expense), with pagination support.
    
*   **Data Visualization**: View income vs. expense summaries using Pie and Bar charts.
    
*   **Receipt and PDF Upload**: Upload images or PDFs of receipts to extract expense details, and upload tabular PDF transaction histories.
    
*   **Multi-User Support**: Register and log in multiple users with JWT-based authentication.
    
*   **API Documentation**: Swagger UI for exploring and testing backend APIs at /api-docs.
    

Tech Stack
-------------

| Layer       | Technologies                                                       |
|-------------|--------------------------------------------------------------------|
| Frontend    | React, React Router, Chart.js, Axios                              |
| Backend     | Node.js, Express, MongoDB, Mongoose, JWT, Multer, Swagger         |
| Database    | MongoDB (Local or Atlas Cloud)                                     |
| Tools       | Swagger (OpenAPI 3.0), Multer, bcrypt, dotenv                      |


Prerequisites
-------------

*   Node.js (v16 or higher)
    
*   MongoDB (local or cloud instance, e.g., MongoDB Atlas)
    
*   npm or yarn
    
*   A modern web browser (e.g., Chrome, Firefox)
    

Installation and Setup
----------------------

1.  git clone cd personal-finance-assistant
    
2.  **Backend Setup**
    
    *   Navigate to the backend directory (if separate, or root if combined).
        
    *   npm install
        
    *   MONGO\_URI=PORT=5000JWT\_SECRET=REACT\_APP\_BASE\_URL=http://localhost:5000
        
    *   npm start
        
    *   The server will run on http://localhost:8000. API documentation is available at http://localhost:8000/api-docs.
        
3.  **Frontend Setup**
    
    *   Navigate to the frontend directory (e.g., client/ if separate).
        
    *   npm install
        
    *   Ensure REACT\_APP\_BASE\_URL in the frontend .env file matches the backend URL (e.g., http://localhost:8000).
        
    *   npm start
        
    *   The frontend will run on http://localhost:3000.
        
4.  **MongoDB Setup**
    
    *   Ensure MongoDB is running locally or use a cloud instance (e.g., MongoDB Atlas).
        
    *   Update MONGO\_URI in the backend .env file with your MongoDB connection string.
        

Usage
-----

1.  **Register/Login**: Navigate to /register or /login to create an account or sign in.
    
2.  **Add Transactions**: Use the /dashboard page to add income or expense transactions.
    
3.  **View Transactions**: Go to /transactions to filter and view transactions with pagination.
    
4.  **Upload Receipts/PDFs**: Use the /upload page to upload receipt images or PDF transaction histories.
    
5.  **View Summaries**: The /dashboard displays income vs. expense charts.
    
6.  **Explore APIs**: Access Swagger UI at http://localhost:8000/api-docs to test API endpoints.
    

Deployment and Demo
-------------------

*   **Deployment**: The application is deployed on [Heroku](https://personal-finance-assistant.herokuapp.com/) (placeholder link; replace with actual deployment URL).
    
*   **Demo**: Watch a video demo [here](https://www.youtube.com/watch?v=example-demo) (placeholder link; replace with actual demo URL).
    

Database Schema and Relationships
---------------------------------

The application uses MongoDB with three main collections: User, Transaction, and Receipt. Below is a visual representation of the schema and relationships:

`   [Users]    - _id: ObjectId    - username: String (unique)    - email: String (unique)    - passwordHash: String    - createdAt: Date  [Transactions]    - _id: ObjectId    - title: String    - amount: Number    - date: Date    - category: String    - description: String    - type: String (enum: 'income', 'expense')    - userId: ObjectId (references Users._id)    - createdAt: Date  [Receipts]    - _id: ObjectId    - transactionId: ObjectId (references Transactions._id)    - filePath: String    - extractedText: String    - uploadedAt: Date  Relationships:  Users (1) ----> (N) Transactions  Transactions (1) ----> (N) Receipts   `

Challenges Faced and Solutions Implemented
------------------------------------------

1.  **Challenge**: Implementing receipt extraction from images/PDFs.
    
    *   **Solution**: Used Multer for file uploads (uploadMiddleWare.js) and assumed a service (transactionService.js) for parsing. Integrated with frontend via FileUpload.jsx to handle both image and PDF uploads dynamically.
        
2.  **Challenge**: Ensuring secure multi-user support.
    
    *   **Solution**: Implemented JWT-based authentication (authMiddleWare.js) to protect routes and associate transactions with user IDs.
        
3.  **Challenge**: Efficient transaction filtering with pagination.
    
    *   **Solution**: Added query parameters (start, end, page, limit) in transactionController.js and used Mongoose for MongoDB queries. Frontend pagination was implemented in TransactionList.jsx.
        
4.  **Challenge**: Visualizing transaction data effectively.
    
    *   **Solution**: Used Chart.js in SummaryChart.jsx to create responsive Pie and Bar charts for income vs. expense summaries.
        
5.  **Challenge**: Providing comprehensive API documentation.
    
    *   **Solution**: Integrated Swagger with swagger.yaml and swaggerConfig.js to document all endpoints, schemas, and security schemes, accessible at /api-docs.
        

Learning Reflection
-------------------

This project provided valuable experience in building a full-stack application with modern web technologies. Key learnings include:

*   **Full-Stack Integration**: Gained proficiency in connecting a React frontend with a Node.js/Express backend via RESTful APIs.
    
*   **MongoDB and Mongoose**: Learned to design and implement MongoDB schemas with relationships and perform efficient queries.
    
*   **File Handling**: Understood how to handle file uploads using Multer and process them for data extraction.
    
*   **Authentication**: Improved knowledge of JWT-based authentication and securing API routes.
    
*   **Data Visualization**: Explored Chart.js for creating interactive and responsive charts.
    
*   **API Documentation**: Mastered Swagger/OpenAPI for documenting APIs, enhancing developer experience.
    
*   **Code Modularity**: Reinforced the importance of modular code design for maintainability and scalability.
    

Future improvements could include adding unit tests, enhancing receipt parsing logic, integrating cloud storage for file uploads, and adding more detailed charts (e.g., expenses by category).