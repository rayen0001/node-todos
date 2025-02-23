# Todo API

This is a simple CRUD (Create, Read, Update, Delete) API built using **Express.js**. The API allows users to manage their todo items by performing operations such as creating, retrieving, updating, and deleting todos. Additionally, the API includes Swagger documentation for easier exploration and testing.

---

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Endpoints](#endpoints)
5. [Swagger Documentation](#swagger-documentation)


---

## Features

- **Create**: Add a new todo item.
- **Read**: Retrieve all todos or a specific todo by ID.
- **Update**: Modify an existing todo item.
- **Delete**: Remove a todo item by ID.
- **Swagger UI**: Interactive API documentation for easy testing.

---

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rayen0001/node-todos.git
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm run start
    ```
The server will start on <http://localhost:3000>

---

## Endpoints

|Method|Endpoint|Description|
|---|---|---|
|POST|</api/todos/create>|Create a new todo item
|GET|</api/todos/all>|Get all todo items
|GET|</api/todos/{id}>|Get a specific todo by ID
|PUT|</api/todos/edit/{id}>|Update a specific todo by ID
|DELETE|</api/todos/delete/{id}>|Delete a specific todo by ID

---

## Swagger Documentation
This API provides interactive documentation using Swagger UI . You can access it at:
```bash
http://localhost:3000/api-docs
```
Here, you can explore the API endpoints, view request/response schemas, and test the API directly from your browser.
