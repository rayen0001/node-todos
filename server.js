const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const app = express();
const port = 3000;


app.use(express.json());

let todos = [];

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Todo API',
        version: '1.0.0',
        description: 'A simple CRUD API for managing todos',
        contact: {
          name: 'Aouechria Rayen',
          email: 'rayenaouechria@gmail.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
      components: {
        schemas: {
          Todo: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'The auto-generated ID of the todo',
              },
              title: {
                type: 'string',
                description: 'The title of the todo',
              },
              description: {
                type: 'string',
                description: 'The description of the todo',
              },
              completed: {
                type: 'boolean',
                description: 'The completion status of the todo',
              },
            },
            example: {
              id: 1,
              title: 'Learn Express.js',
              description: 'Learn how to build a CRUD API with Express.js',
              completed: false,
            },
          },
        },
      },
    },
    apis: ['./server.js'], 
};

/**
 * @swagger
 * /api/todos/create:
 *   post:
 *     summary: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               title: Learn Express.js
 *               description: Learn how to build a CRUD API with Express.js
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Title and description are required
 */
app.post('/api/todos/create', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
  
    const newTodo = {
      id: todos.length + 1,
      title,
      description,
      completed: false
    };
  
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

/**
 * @swagger
 * /api/todos/all:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
app.get('/api/todos/all', (req, res) => {
    res.json(todos);
});

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the todo
 *     responses:
 *       200:
 *         description: Todo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
app.get('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
  
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
  
    res.json(todo);
});

/**
 * @swagger
 * /api/todos/edit/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *             example:
 *               title: Master Express.js
 *               description: Learn advanced Express.js concepts
 *               completed: true
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
app.put('/api/todos/edit/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
  
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
  
    const { title, description, completed } = req.body;
  
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
  
    res.json(todo);
});

/**
 * @swagger
 * /api/todos/delete/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the todo
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
app.delete('/api/todos/delete/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);
  
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
  
    todos.splice(todoIndex, 1);
    res.status(204).send();
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`Server is running on :${port}`);
});