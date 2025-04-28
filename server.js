const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Banco de dados
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

// Para ler JSON (caso precise no futuro)
app.use(express.json());

// SERVIR arquivos estáticos (CSS, JS, imagens)
app.use(express.static('public'));

// Rota principal: manda o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Exemplo de API para pegar confirmados (se você quiser depois)
app.get('/confirmados', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM confirmados');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
});

// Escuta no servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
