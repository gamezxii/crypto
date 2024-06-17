# crypto

Take-Home Test for Full-Stack Developer

# My Crypto Portfolio

My Crypto Portfolio is a cryptocurrency tracking application that allows users to input and track their cryptocurrency holdings, comparing gains or losses based on real-time prices.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Design](#design)
- [API Documentation](#api-documentation)
- [Security](#security)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gamezxii/crypto.git
   cd crypto
   ```

2. Install the dependencies for both backend and frontend:

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

## Setup

### Backend

1. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```plaintext
   DATABASE_URL=your-database-url
   COINMARKETCAP_API_KEY=your-coinmarketcap-api-key
   ```

2. Start the backend server:

   ```bash
   cd backend
   npm run start
   ```

### Frontend

1. Create a `.env` file in the `frontend` directory and add the following environment variables:

   ```plaintext
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the application to track your cryptocurrency holdings, view the top coins you own, and manage your portfolio.

## Design

### Frontend

- **Framework**: React with TypeScript
- **State Management**: MobX
- **Styling**: Tailwind CSS
- **Routing**: React Router

### Backend

- **Framework**: NestJS
- **Database**: SQL (using TypeORM)
- **API**: RESTful API for managing user accounts and cryptocurrency portfolios

## API Documentation

### Endpoints

#### Get Portfolio

- **URL**: `/portfolio/:userId`
- **Method**: `GET`
- **Description**: Retrieves the portfolio for a specific user.
- **Response**:
  ```json
  {
    "portfolio": [
      {
        "coin": "BTC",
        "amount": 1.5,
        "averagePurchasePrice": 50000,
        "currentPrice": 1500000,
        "profitOrLoss": 1450000,
        "percentProfitOrLoss": 2900,
        "assetValue": 2250000,
        "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
      }
    ],
    "totalAssetValue": 2250000
  }
  ```
