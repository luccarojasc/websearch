const express = require('express');
const router = express.Router();
const sessionChecker = require('../middlewares/sessionChecker');
const Website = require('../models/Website');

router.use(sessionChecker);

router.post('/add', async (req, res) => {
  const { url, title, description, keywords } = req.body;

  if (!url || !title || !Array.isArray(keywords) || keywords.length === 0) {
    return res.status(400).json({ error: 'Todos os campos sao obrigatorios' });
  }

  try {
    await Website.insertWebsite({ url, title, description, keywords });
    res.status(201).json({ message: 'Website cadastrado com sucesso' });
  } catch (error) {
    Logger.logError(error);
    console.error("Erro detalhado ao inserir website:", error);
    throw error;
  }

});

router.get('/search', async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Palavra-chave e obrigatoria' });
  }

  try {
    const results = await Website.searchByKeyword(keyword);
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar websites' });
  }
});

module.exports = router;
