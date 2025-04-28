const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Conexão com PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Render vai definir essa variável
    ssl: {
        rejectUnauthorized: false
    }
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Pega todas confirmações
app.get('/confirmacoes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM confirmacoes ORDER BY equipe ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Salva uma confirmação
app.post('/confirmar', async (req, res) => {
    const { equipe, nome } = req.body;
    if (!equipe || !nome) {
        return res.status(400).send('Dados incompletos');
    }

    try {
        await pool.query('INSERT INTO confirmacoes (equipe, nome) VALUES ($1, $2)', [equipe, nome]);
        res.status(200).send('Confirmação registrada!');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
