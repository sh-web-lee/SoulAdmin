import moment from "moment";
import { db } from "../db.js";
import { transformImgToBase64, urlToBase64 } from "../utils/common.js";



export function addArticle(req, res) {
  const { title, content, author, cover, tags, category, desc, isTop } = req.body;

  const sql = 'INSERT INTO articles(`title`, `content`, `author`, `cover`, `tags`, `category`, `desc`, `isTop`, `createdAt`, `userId`) VALUES(?)'

  const top = isTop ? 1 : 0;

  const values = [title, content, author, cover, JSON.stringify(tags), category, desc, top, new Date(), req.id ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.status(200).json({
        code: 0,
        data,
        msg: err.message
      })
    }

    res.status(200).json({
      code: 0,
      data: null,
      msg: 'success'
    })
  })
}

export function getArticles(req, res) {
  const { current, size } = req.query;
  const offset = (current - 1) * size


  const sql = `SELECT * FROM articles LIMIT ${offset}, ${size}`

  db.query(sql, null, (err, data) => {
    const result = data.map(item => {
      return {
        ...item,
        isTop: Boolean(item.isTop),
        tags: JSON.parse(item.tags),
        createdAt: transformDate(item.createdAt),
        updatedAt: transformDate(item.updatedAt),
      }
    })
    if (err) {
      return res.status(200).json({
        code: 1,
        data: null,
        msg: err.message
      })
    }

    res.status(200).json({
      code: 0,
      data: {
        current: Number(current),
        size: Number(size),
        items: result,
        total: data.length
      },
      msg: 'success'
    })
  })
}


function transformDate(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}