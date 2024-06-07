import { db } from "../db.js";

export const getCategoryList = (req, res) => {
  const sql = `SELECT * FROM catogerys`;

  db.query(sql, [], (err, data) => {
    if (err) {
      return res.status(500)
    }
    res.json({
      code: 0,
      data: {
        items: data,
        total: data.length
      },
      msg: 'success'
    })
  })
}