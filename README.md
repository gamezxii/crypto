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
   git clone https://github.com/your-username/my-crypto-portfolio.git
   cd my-crypto-portfolio
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
   DATABASE_HOST=your-database-host
   DATABASE_PORT=your-database-port
   DATABASE_USER=your-database-user
   DATABASE_PASSWORD=your-database-password
   DATABASE_DB=your-database-name
   DATABASE_POOL_MAX=10
   DATABASE_POOL_MIN=1
   DATABASE_POOL_ACQUIRE=30000
   DATABASE_POOL_IDLE=10000
   DATABASE_LOG=true
   JWT_SECRET=your-jwt-secret
   X-CMC_PRO_API_KEY=your-coinmarketcap-api-key
   ```

2. Create a `.env` file in the `be-migration` directory and add the following environment variables:

   ```plaintext
   DATABASE_HOST=your-database-host
   DATABASE_PORT=your-database-port
   DATABASE_USER=your-database-user
   DATABASE_PASSWORD=your-database-password
   DATABASE_DB=your-database-name
   ```

3. Run Docker Compose to start the database:

   ```bash
   docker-compose up -d
   ```

4. Run database migrations:

   ```bash
   cd be-migration
   yarn migration:run
   ```

5. Start the backend server:

   ```bash
   cd ../backend
   npm run start
   ```

### Frontend

1. Create a `.env` file in the `frontend` directory and add the following environment variables:

   ```plaintext
   REACT_APP_API_BASE_URL=http://localhost:5000
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
- **Database**: SQL (using Sequelize, postgres)
- **API**: RESTful API for managing user accounts and cryptocurrency portfolios

## API Documentation

### Endpoints

#### Authen

#### Post Signin

- **URL**: `/v1/auth/signin`
- **Method**: `Post`
- **Description**: Retrieves the portfolio for a specific user.
- **Body**:

```json
{
  "username": "Jhon@gmail.com",
  "password": "xxx"
}
```

- **Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraWQiOiI3NzA0ZTU1Ni1kY2RmLTRiMjktYjk4OC0xMjkzNTFmYmIyZWMiLCJmaXJzdF9uYW1lIjoibml0c2FydXQiLCJsYXN0X25hbWUiOiJiZSIsImlhdCI6MTcxODYzNjk4MSwiZXhwIjoxNzE4NzIzMzgxfQ.C2BFi_fV3o3Qi-G6b3PR4ug7actE6GiUNjV5pj_lHAA",
    "first_name": "Jhon",
    "last_name": "doe"
  }
  ```

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
