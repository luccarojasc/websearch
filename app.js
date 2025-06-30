const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');
const websiteRoutes = require('./src/routes/websites');

const app = express();
app.use(bodyParser.json());

app.use(session({
    secret: 'segredo-super-seguro',
    resave: false,
    saveUninitialized: false
}));

app.use('/auth', authRoutes);
app.use('/websites', websiteRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota nao encontrada' });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
