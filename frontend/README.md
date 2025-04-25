# Product Management System (MERN Stack)

A simple full-stack CRUD application for managing products using MongoDB, Express.js, React.js, and Node.js.

---

## Features
- Add a product
- List all products
- Update a product
- Delete a product
- Filter/Search by product name

---



## Setup Instructions

### Prerequisites
- Node.js
- MongoDB (running locally)

### 1. Backend Setup
```bash
cd backend
npm install express mongoose cors
```

#### Run Backend
```bash
node server.js
```

#### Seed the Database
```bash
node seed.js
```

### 2. Frontend Setup
```bash
cd frontend
npx create-react-app .
npm install axios
```

#### Start React App
```bash
npm start
```

---

## MongoDB Sample Dataset
```json
[
  { "name": "Laptop", "category": "Electronics", "price": 700, "inStock": true },
  { "name": "Shoes", "category": "Fashion", "price": 50, "inStock": true },
  { "name": "Notebook", "category": "Stationery", "price": 5, "inStock": false }
]
```

---

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /products         | List all products |
| POST   | /products         | Add a new product |
| PUT    | /products/:id     | Update a product by ID |
| DELETE | /products/:id     | Delete a product by ID |
| GET    | /products?search=name | Filter products by name |

---

## Postman Collection
*You can optionally import a Postman collection to test all endpoints.*

---

## Demo
- Record your screen (use OBS, Loom, or any screen recorder)
- Show all functionality: Add, Update, Delete, Search

---

## Author
Karthickraja

---

## License
This project is for demonstration/testing purposes.