import { db } from "../db.js";


export const getUserInfo = (req, res) => {

  const sql = 'SELECT * FROM users WHERE id = ?';

  db.query(sql, req.id, (err, data) => {
    if (err) {
      return res.status(500)
    }
    const { username, role, email, avatar, id:userId } = data[0]
    res.status(200).json({
      code: 0,
      data: { username, roles: [role], email, avatar, userId },
      mes: 'success'
    })

  })
}