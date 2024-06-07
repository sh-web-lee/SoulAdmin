const User = require("../../model/user/user");
const { randomNickname, getIpAddress } = require("../../utils/tool");
const bcrypt = require("bcryptjs"); // 密码加盐加密
const { Op } = require("sequelize");

const filterSensitive = require("../../utils/sensitive");

class UserService {
  /**
   * 用户注册
   * @param {*} user
   */
  async createUser(user) {
    let { username, password, email, qq } = user;

    // 过滤敏感词
    username = await filterSensitive(username);
    const avatar = "http://mrzym.top/online/9bb507f4bd065759a3d093d04.webp";
    const res = await User.create({ username, password, email, qq, avatar, roles: 'user' });

    return res.dataValues;
  }

  /**
   * 用户自己修改用户信息
   * @param {*} id
   * @param {*} user
   * @returns
   */
  async updateOwnUserInfo(id, user) {
    let { avatar, nick_name, qq } = user;
    nick_name = await filterSensitive(nick_name);
    const res = await User.update({ avatar, nick_name, qq }, { where: { id } });
    return res[0] > 0 ? true : false;
  }

  /**
   * 修改用户密码
   * @param {*} id
   * @param {*} password
   */
  async updatePassword(id, password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const res = await User.update({ password: hash }, { where: { id } });
    return res[0] > 0 ? true : false;
  }

  /**
   * 修改用户角色
   * @param {*} id
   * @param {*} roles
   */
  async updateRole(id, roles) {
    const res = await User.update({ roles: roles }, { where: { id } });
    return res[0] > 0 ? true : false;
  }

  /**
   * 根据条件查找一个用户
   * @param { id, username,roles}
   * @returns Users
   */
  async getOneUserInfo({ id, email, password, roles }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    email && Object.assign(whereOpt, { email });
    password && Object.assign(whereOpt, { password });
    roles && Object.assign(whereOpt, { roles });
    const res = await User.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }

  /**
   * 分页查询用户列表
   */
  async getUserList({ current, size, username, roles, email }) {
    // 分页
    const offset = (current - 1) * size;
    const limit = size * 1;

    // 条件
    const whereOpt = {};
    roles &&
      Object.assign(whereOpt, {
        roles: {
          [Op.eq]: roles,
        },
      });
    username &&
      Object.assign(whereOpt, {
        username: {
          [Op.like]: `%${username}%`,
        },
      });
    email &&
    Object.assign(whereOpt, {
      email: {
        [Op.like]: `%${email}%`,
      },
    });
    const { count, rows } = await User.findAndCountAll({
      offset,
      limit,
      attributes: { exclude: ["password"] },
      where: whereOpt,
    });
    console.log(123, rows)

    rows.forEach((v) => {
      if (v.dataValues.ip) {
        v.dataValues.ip_address = getIpAddress(v.dataValues.ip);
      } else {
        v.dataValues.ip_address = "火星";
      }
    });

    return {
      current,
      size,
      total: count,
      items: rows,
    };
  }

  /**
   * 修改用户ip地址
   * @param {*} id
   * @param {*} ip
   */
  async updateIp(id, ip) {
    const res = await User.update(
      {
        ip,
      },
      {
        where: {
          id,
        },
      }
    );
    return res[0] > 0 ? true : false;
  }

  /**
   * 根据用户id获取昵称
   * @param {*} id
   */
  async getAuthorNameById(id) {
    let res = await User.findByPk(id);
    return res ? res.dataValues.username : null;
  }

  // 获取用户总数
  async getUserCount() {
    let res = await User.count();
    return res;
  }

  // 管理员修改用户信息
  async adminUpdateUserInfo({ id, nick_name, avatar }) {
    let res = await User.update(
      { nick_name, avatar },
      {
        where: {
          id,
        },
      }
    );
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();
