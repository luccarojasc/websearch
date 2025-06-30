const express = require('express');
const router = express.Router();
const sessionChecker = require('../middlewares/sessionChecker');
const Website = require('../models/Website');
const Keyword = require('../models/Keyword');

router.use(sessionChecker);

router.post('/add', async (req, res) => {
    const { url, title, keywords } = req.body;

    if (!url || !title || !Array.isArray(keywords) || keywords.length === 0) {
        return res.status(400).json({ error: 'Todos os campos sao obrigatorios' });
    }

    try {
        const site = new Website(url, title);
        await site.save();

        for (const word of keywords) {
            const keyword = new Keyword(word);
            await keyword.linkToWebsite(site.url);
        }

        res.status(201).json({ message: 'Website cadastrado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar o website' });
    }
});

router.get('/search', async (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: 'Palavra-chave e obrigatoria' });
    }

    try {
        const keywordObj = new Keyword(keyword);
        const sites = await keywordObj.getLinkedWebsites();
        res.json({ results: sites });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar websites' });
    }
});

module.exports = router;
