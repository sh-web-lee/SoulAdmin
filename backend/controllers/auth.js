import { db } from "../db.js"
import bcrypt from 'bcryptjs'
import { Base64 } from 'js-base64';
import jwt from "jsonwebtoken";


export const register = (req, res) => {
  
  const { email, username, password } = req.body;

  const decodePwd = Base64.decode(password);

  // CHECK EXISTING USER
  const q = 'SELECT * FROM users WHERE email = ? OR username = ?'

  db.query(q, [email, username], (err, data) => {
    if (err) {
      return res.status(200).json({
        code: 1,
        data: null,
        msg: err.message
      })
    }
    if (data.length) {
      return res.status(200).json({
        code: 1,
        data: null,
        msg: "User already exists!"
      })
    }

    // Hash password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(decodePwd, salt);

    const q = "INSERT INTO users(`username`, `email`, `password`, `role`) VALUES (?)"
    const values = [username, email, hash, 'user']
    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(200).json({
          code: 0,
          data: null,
          msg: err.message
        })
      }

      return res.status(200).json({
        code: 0,
        data: null,
        msg: 'success'
      })
    })

  })
}

export const login = (req, res) => {
  const { password, email } = req.body;

  // search mysql
  const q = 'SELECT * FROM users WHERE email = ?';
  db.query(q, [email], async (err, data) => {
    if (err) {
      return res.status(500)
    }
    if (data) {
      const decodePwd = Base64.decode(password);

      // Hash password and create a user
      const isMatch = bcrypt.compareSync(decodePwd, data[0].password);

      if (!isMatch) {
        return res.status(200).json({
          code: 1,
          data: null,
          msg: "账号密码不正确"
        })
      }

      const token = jwt.sign({role: data[0].role, id: data[0].id}, process.env.APP_JWT_SECRET)

      res.status(200).json({
        code: 0,
        msg: "success",
        data: {
          token
        }
      })
    }
  })
}
export const logout = (req, res) => {

}