# Compliance Dashboard

This project is a compliance dashboard showcasing various compliance metrics for startup companies, such as compliance score, risk assessments, audit history, and upcoming deadlines. The project is built using React, TypeScript, Tailwind CSS for the front end, and Node.js with Express for the backend.

## Features

- Interactive dashboard with tooltips, bar charts, and pie charts.
- Compliance history and score trends presented in a user-friendly way.
- Responsive design for both large and small screens.
- Simple backend API providing mock compliance data.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js, Express

## Prerequisites

- Node.js and npm installed on your machine.

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/krish4uu/compliance-dashboard.git
cd compliance-dashboard
```

### Step 2: Install Dependencies

#### Frontend

Navigate to the `client` folder and install dependencies:

```bash
cd client
npm install
```

#### Backend

Navigate to the `server` folder and install dependencies:

```bash
cd server
npm install
```

### Step 3: Run the Project

#### Backend

In the `server` folder, start the backend server:

```bash
npm run server
```

This will start the server on `http://localhost:5000/api/compliance-metrics`.

#### Frontend

In a new terminal window, navigate to the `client` folder and start the React development server:

```bash
npm start
```

The frontend should now be running at `http://localhost:3000`.


## API Endpoints

- **GET /api/compliance-metrics**: Returns compliance metrics data for the dashboard.

## Screenshots

### Compliance Dashboard