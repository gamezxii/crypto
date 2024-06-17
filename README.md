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

- **Response 200**:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraWQiOiI3NzA0ZTU1Ni1kY2RmLTRiMjktYjk4OC0xMjkzNTFmYmIyZWMiLCJmaXJzdF9uYW1lIjoibml0c2FydXQiLCJsYXN0X25hbWUiOiJiZSIsImlhdCI6MTcxODYzNjk4MSwiZXhwIjoxNzE4NzIzMzgxfQ.C2BFi_fV3o3Qi-G6b3PR4ug7actE6GiUNjV5pj_lHAA",
    "first_name": "Jhon",
    "last_name": "doe"
  }
  ```

  - **Response 400**:

  ```json
  {
    "status_code": 400,
    "error_code": "UNAUTHORIZED",
    "data": {
      "message": "Invalid email or password."
    }
  }
  ```

#### Post Signup

- **URL**: `/v1/auth/signup`
- **Method**: `Post`
- **Description**: Retrieves the portfolio for a specific user.
- **Body**:

```json
{
  "username": "jhon@gmail.com",
  "password": "123456",
  "first_name": "jhon",
  "last_name": "be"
}
```

- **Response 201**:

  ```json
  {
    "message": "Register success fully."
  }
  ```

  - **Response 400**:

  ```json
  {
    "status_code": 400,
    "error_code": "BAD_REQUEST",
    "data": {
      "message": "Error something went wrong."
    }
  }
  ```

#### Portfolio API

#### Get asset-info

- **URL**: `v1/portfolio/asset-info`
- **Method**: `Get`
- **Authorization**: `Bearer eyJhbGciOiJIUzI1`
- **Description**: Retrieves the assets for a specific user.

- **Response 200**:

  ```json
  {
    "assets": [
      {
        "id": "c7ae6bc5-2f84-4229-99fa-909ec956cf44",
        "user_id": "7704e556-dcdf-4b29-b988-129351fbb2ec",
        "coin": "BTC",
        "amount": "116.2100000000",
        "average_purchase_price": "54748.1714138198",
        "created_at": "2024-06-17T11:33:25.686Z",
        "updated_at": "2024-06-17T13:21:19.827Z",
        "deleted_at": null,
        "currentPrice": 1250000,
        "profitOrLoss": 138900215,
        "percentProfitOrLoss": 2183.1812784243402,
        "assetValue": 145262500,
        "name": "Bitcoin",
        "picture": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
      },
      {
        "id": "d79060e0-9af6-4199-b260-17a6828c8599",
        "user_id": "7704e556-dcdf-4b29-b988-129351fbb2ec",
        "coin": "ETH",
        "amount": "3.0000000000",
        "average_purchase_price": "13410.6666666667",
        "created_at": "2024-06-17T13:01:07.830Z",
        "updated_at": "2024-06-17T13:12:26.263Z",
        "deleted_at": null,
        "currentPrice": 129536.86517519534,
        "profitOrLoss": 348378.59552558593,
        "percentProfitOrLoss": 865.9241288665366,
        "assetValue": 388610.59552558605,
        "name": "Ethereum",
        "picture": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
      }
    ],
    "totalAssetValue": 145651110.5955256
  }
  ```

  - **Response 400**:

  ```json
  {
    "status_code": 400,
    "error_code": "BAD_REQUEST",
    "data": {
      "message": "Error something went wrong."
    }
  }
  ```

#### Post Fund

- **URL**: `/v1/auth/portfolio`
- **Method**: `Post`
- **Authorization**: `Bearer eyJhbGciOiJIUzI1`
- **Description**: Deposit Crypto for a user.
- **Body**:

```json
{
  "amount": 2,
  "coin": "BTC",
  "purchasePrice": 12
}
```

- **Response 204**:

  ```json
  No Conent
  ```

  - **Response 400**:

  ```json
  {
    "status_code": 400,
    "error_code": "BAD_REQUEST",
    "data": {
      "message": "Error something went wrong."
    }
  }
  ```

#### Maret API

#### Get Market Prices

- **URL**: `/v1/market`
- **Method**: `GET`
- **Authorization**: `Bearer eyJhbGciOiJIUzI1`
- **Description**: Retrieves the market data.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Bitcoin",
      "symbol": "BTC",
      "slug": "bitcoin",
      "num_market_pairs": 11113,
      "date_added": "2010-07-13T00:00:00.000Z",
      "max_supply": 21000000,
      "circulating_supply": 19713500,
      "total_supply": 19713500,
      "infinite_supply": false,
      "platform": null,
      "cmc_rank": 1,
      "self_reported_circulating_supply": null,
      "self_reported_market_cap": null,
      "tvl_ratio": null,
      "last_updated": "2024-06-17T17:09:00.000Z",
      "quote": {
        "THB": {
          "price": 2433447.1014326517,
          "volume_24h": 895901346768.613,
          "volume_change_24h": 91.5969,
          "percent_change_1h": 0.85589296,
          "percent_change_24h": -0.75560634,
          "percent_change_7d": -5.45098065,
          "percent_change_30d": -1.34480089,
          "percent_change_60d": 3.97973814,
          "percent_change_90d": 1.29565633,
          "market_cap": 47971759434092.57,
          "market_cap_dominance": 54.2836,
          "fully_diluted_market_cap": 51102389130085.625,
          "tvl": null,
          "last_updated": "2024-06-17T17:09:01.000Z"
        }
      }
    }
  ]
  ```

#### Transaction API

#### Get Market Prices

- **URL**: `/v1/ransaction/portfolio/:id`
- **Method**: `GET`
- **Authorization**: `Bearer eyJhbGciOiJIUzI1`
- **Description**: Retrieves the transaction data off deposit.
- **Response**:
  ```json
  [
    {
      "id": "b7bc95a1-6e15-420c-a708-b032f47e301c",
      "user_id": "7704e556-dcdf-4b29-b988-129351fbb2ec",
      "coin": "ETH",
      "transaction_type": "BUY",
      "amount": "1.0000000000",
      "price": "232.0000000000",
      "created_at": "2024-06-17T13:12:26.295Z"
    },
    {
      "id": "f0e88d9b-d16c-4412-ac9a-7997dabbc3a6",
      "user_id": "7704e556-dcdf-4b29-b988-129351fbb2ec",
      "coin": "ETH",
      "transaction_type": "BUY",
      "amount": "2.0000000000",
      "price": "20000.0000000000",
      "created_at": "2024-06-17T13:01:07.889Z"
    }
  ]
  ```
