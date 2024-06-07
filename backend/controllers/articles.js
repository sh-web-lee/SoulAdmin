import { db } from "../db.js";


export function addArticle(req, res) {
  const { title, content, author, cover, tags, desc, category, isTop } = req.body;

  const sql = 'INSERT INTO articles(`title`, `content`, `cover`, `author`, `desc`, `category`, `tags`, `isTop`, `createdAt`, `userId`) VALUES(?)'

  const values = [title, content, cover, author, desc, category, JSON.stringify(tags), isTop, new Date(), req.id ]
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.status(200).json({
        code: 0,
        data: null,
        msg: err.message
      })
    }

    res.status(200).json({
      code: 0,
      data,
      msg: 'success'
    })
  })
}