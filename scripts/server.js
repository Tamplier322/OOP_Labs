const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const pool = new Pool({
    user: "postgres",
    password: "rootroot",
    host: "localhost",
    port: "5433",
    database: "Task-manager",
});

const app = express();
const users = [];
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(cors());

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        const users = result.rows;
        res.json(users);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.get('/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects');
        const users = result.rows;
        res.json(users);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        const users = result.rows;
        res.json(users);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.get('/subtasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM subtasks');
        const users = result.rows;
        res.json(users);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const { title, description, deadline, priority, type, project_id } = req.body;
        if (!title || !description || !deadline || !priority || !type) {
            return res.status(400).json({ error: 'Все поля должны быть заполнены' });
        }
        const query = 'INSERT INTO tasks (title, description, deadline, priority, type, project_id) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [title, description, deadline, priority, type, project_id];
        await pool.query(query, values);

        console.log('Задача успешно добавлена в базу данных!');

        res.json({ message: 'Задача успешно добавлена' });
    } catch (error) {
        console.error('Ошибка при добавлении задачи в базу данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, surname, email, login, password } = req.body;
        if (!name || !surname || !email || !login || !password) {
            return res.status(400).json({ error: 'Все поля должны быть заполнены' });
        }
        const loginQuery = 'SELECT * FROM users WHERE login = $1';
        const loginValues = [login];
        const loginResult = await pool.query(loginQuery, loginValues);

        if (loginResult.rows.length > 0) {
            return res.status(400).json({ error: 'Пользователь с таким логином уже существует' });
        }
        const query = 'INSERT INTO users (name, surname, email, login, password) VALUES ($1, $2, $3, $4, $5)';
        const values = [name, surname, email, login, password];
        await pool.query(query, values);

        console.log('Пользователь успешно добавлен в базу данных!');

        res.json({ message: 'Пользователь успешно добавлен' });
    } catch (error) {
        console.error('Ошибка при добавлении пользователя в базу данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.get('/users/check', async (req, res) => {
    try {
        const login = req.query.login;

        const loginQuery = 'SELECT * FROM users WHERE login = $1';
        const loginValues = [login];
        const loginResult = await pool.query(loginQuery, loginValues);

        res.json({ exists: loginResult.rows.length > 0 });
    } catch (error) {
        console.error('Ошибка при проверке существования логина:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});