# Products CRUD API

This project is a RESTful API built with TypeScript and Express.js that provides basic CRUD operations for managing products. The database is stored in a products.json file.

## Requirements

### Basic CRUD Operations

##### Create: Add a new product.
##### Read: Retrieve a list of products, with optional filtering by category.
##### Update: Update an existing product's details.
##### Delete: Soft delete a product by setting a deleted flag.

### Advanced Features
 - **GET Request**:
 Filter products by category using an optional query parameter.
 - **POST Request**:
Validate that stock.available is a non-negative integer.
Ensure price is a positive number.
 - **PUT Request**: 
 Implement partial updates specifically for updating the street field of the manufacturer.address.
 - **DELETE Request**: 
 Implement soft deletion by adding a deleted field to the product and ensure that deleted products are filtered out from the GET endpoints.

## Installation

 1. Clone the repository
 
```bash
git clone https://github.com/Nare-Stepanyan/express-ts.git
cd express-ts
git checkout -b crud-restful-api
```

2. Install dependencies

```bash
npm install
```
3. Run the application

```bash
npm start
```


## API Endpoints

### GET /products
Retrieve a list of products.

- **Query Parameters**:
  - `category` (optional): Filter products by category.

#### Available Categories

- `sports`
- `electronics`
- `health`
- `home`
- `automation`


#### Example Request:

```http
GET /products?category=electronics
```

#### Response:

```json
{
  "status": "success",
  "result": 10,
  "data": [/* array of products */]
}
```

### GET /products/{:id}
Get the product by id.

#### Example Request:

```http
GET /products/10
```
#### Response:

```json
{
  "status": "success",
  "data": {/* the product details */}
}
```

### POST /products
Create a new product.

- **Request Body**:

```json 
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "Electronics",
  "stock": {
    "available": 100,
    "reserved": 0,
    "location": "Warehouse"
  },
  "tags": ["tag1", "tag2"],
  "rating": 4.5,
  "deleted": false
}
```

 - **Validation**:

    - stock.available must be a non-negative integer.
    - price must be a positive number.

#### Example Request:

```http
POST /products
```
#### Response:

```json
{
  "status": "success",
  "product": { /* created product details */ }
}
```
PATCH /products/{:id}

Update the street field of the manufacturer.address for a specific product.

- **Request Body**:

```json
{
  "street": "New Street Address"
}
```

#### Example Request:

```http
PATCH /products/1
```

#### Response: 

```
{
  "status": "success",
  "product": { /* updated product details */ }
}
```

DELETE /products/{:id}

Soft delete a product by setting the deleted field to true.
#### Example Request:

```http
DELETE /products/6
```
#### Response: 
```json
1
```
