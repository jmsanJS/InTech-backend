var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/headlines', (req, res) => {
  fetch(`https://newsapi.org/v2/everything?sources=wired,the-verge,techcrunch,ars-technica,new-scientist,the-next-web&apiKey=${NEWS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        res.json({ articles: data.articles });
      } else {
        res.json({ articles: [] });
      }
    });
});

router.get('/articles/:source/:query', (req, res) => {
  fetch(`https://newsapi.org/v2/everything?sources=${req.params.source}&q=${req.params.query}&apiKey=${NEWS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        res.json({ result: true, query: data.articles });
      } else {
        res.json({ query: [] });
      }
    });
});

module.exports = router;