const express = require('express');
const router = express.Router();

const USUARIO_PADRAO = { username: 'admin', password: '1234' };

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Usuario e senha sao obrigatorios' });
    }

    if (username === USUARIO_PADRAO.username && password === USUARIO_PADRAO.password) {
        req.session.user = username;
        res.json({ message: 'Login bem-sucedido' });
    } else {
        res.status(401).json({ error: 'Usuario ou senha invalidos' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao encerrar a sessao' });
        }
        res.json({ message: 'Logout realizado com sucesso' });
    });
});

module.exports = router;
