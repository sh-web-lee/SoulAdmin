/**
 * 上传路由
 * @author: M
 */

const Router = require("koa-router");
const router = new Router({ prefix: "/api/upload" });
const { auth, needAdminAuth } = require('../middleware/auth')

const { upload, deleteOss } = require("../controller/utils/index");

// 图片上传
router.post("/img", auth, needAdminAuth, upload);

// 删除oss文件
router.post("/delete", auth, needAdminAuth, deleteOss)

module.exports = router;
