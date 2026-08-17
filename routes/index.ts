import express, { Request, Response } from "express";
const router = express.Router();

import fetch from "node-fetch";

const NEWS_API_KEY = process.env.NEWS_API_KEY;

interface NewsApiArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsApiResponse {
  status: string;
  articles?: NewsApiArticle[];
}

router.get("/headlines", (req: Request, res: Response) => {
  fetch(
    `https://newsapi.org/v2/everything?sources=wired,the-verge,techcrunch,ars-technica,new-scientist,the-next-web&apiKey=${NEWS_API_KEY}`
  )
    .then((response) => response.json())
    .then((data: NewsApiResponse) => {
      if (data.status === "ok") {
        res.json({ articles: data.articles });
      } else {
        res.json({ articles: [] });
      }
    });
});

router.get(
  "/articles/:source/:query",
  (req: Request<{ source: string; query: string }>, res: Response) => {
    fetch(
      `https://newsapi.org/v2/everything?sources=${req.params.source}&q=${req.params.query}&apiKey=${NEWS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data: NewsApiResponse) => {
        if (data.status === "ok") {
          res.json({ result: true, query: data.articles });
        } else {
          res.json({ query: [] });
        }
      });
  }
);

export default router;
