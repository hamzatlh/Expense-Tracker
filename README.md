<h1>ExpenseTracker</h1>

<h3>ExpenseTracker is a web application designed to help users manage their personal finances effectively.

It allows users to track their income and expenses.</h3>

Features

    User Authentication: Secure user login using Google OAuth2.
    Expense and Income Tracking: Easily add  your income and expenses.
    Transaction History: View your past transactions .
    Responsive UI: friendly design for a seamless experience.

Tech Stack

    Frontend: React,js
    Backend: Django REST Framework, OAuth2
    Database: SQLite
    Authentication: Google OAuth2
    API: RESTful APIs for CRUD operations

Getting Started

Make sure you have the following installed:

    Node.js
    Python 3.x
    Django

Clone the repository:

    git clone https://github.com/yourusername/expensetracker.git
    cd expensetracker

Install backend dependencies:

    pip install -r requirements.txt

Run database migrations:

    python manage.py makemigrations
    python manage.py migrate

Start the Django server:

    python manage.py runserver

Frontend Setup

    Navigate to the frontend folder:

    cd frontend

Install frontend dependencies:

    npm install

Start the React development server:

    npm run dev

User Experience

  User Registration/Login: Users can log in using their Google account. The app uses OAuth2 for secure authentication.
  
  Dashboard: Once logged in, users land on the dashboard where they can view a summary of their financial status, including total income, total expenses, and balance.
  
  Add Transactions: Users can easily add new income or expense entries. Each transaction requires a description, amount.
    
  Transaction History: Users can view a detailed history of their transactions .
  
  Logout: Users can securely log out of their account when done.

Future Enhancements

  Budget Planner: Allow users to set monthly budgets .

  Data Visualization: provides pie charts or bar graphs to help users understand their spending patterns.

  Multi-Currency Support: Enable users to add expenses in different currencies and automatically convert them based on the current exchange rates.

  Receipt Upload: Allow users to upload photos of their receipts, which can be scanned for automatic entry using Optical Character Recognition (OCR).

  Notifications and Reminders: Implement notifications to remind users of upcoming bills or significant changes in their spending patterns.

  Dark Mode: Add a dark mode theme for a better user experience, especially in low-light environments.


<h2>Design Choices and User Experience (UX) Considerations</h2>

My design prioritizes simplicity and clarity to enhance user experience. I chose a clean interface with a clear visual hierarchy, allowing users to easily track income and expenses.
Real-time feedback and responsive design help users feel confident in their actions. 
By focusing on key user needs and minimizing clutter, I created an intuitive and immersive experience tailored for efficient financial management.
    
