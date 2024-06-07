/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80034
 Source Host           : localhost:3306
 Source Schema         : online_blog

 Target Server Type    : MySQL
 Target Server Version : 80034
 File Encoding         : 65001

 Date: 07/06/2024 17:37:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_article
-- ----------------------------
DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '文章标题 不能为空',
  `author_id` int NULL DEFAULT 1 COMMENT '文章作者 不能为空',
  `category_id` int NULL DEFAULT NULL COMMENT '分类id 不能为空',
  `article_content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '文章内容',
  `article_cover` varchar(1234) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '	https://mrzym.gitee.io/blogimg/html/rabbit.png' COMMENT '文章缩略图',
  `is_top` int NULL DEFAULT 2 COMMENT '是否置顶 1 置顶 2 取消置顶',
  `status` int NULL DEFAULT 1 COMMENT '文章状态  1 公开 2 私密 3 草稿箱',
  `type` int NULL DEFAULT 1 COMMENT '文章类型 1 原创 2 转载 3 翻译',
  `origin_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '原文链接 是转载或翻译的情况下提供',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  `view_times` int NULL DEFAULT 0 COMMENT '文章访问次数',
  `article_description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '描述信息 不能为空',
  `thumbs_up_times` int NULL DEFAULT 0 COMMENT '文章点赞次数',
  `reading_duration` double NULL DEFAULT 0 COMMENT '文章阅读时长',
  `order` int NULL DEFAULT NULL COMMENT '排序 1 最大 往后越小 用于置顶文章的排序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_article
-- ----------------------------
INSERT INTO `blog_article` VALUES (49, '利用 css 渐变背景写好看的按钮', 254, 4, '## 前置知识\n1. 首先需要找到一个提供渐变色 css 的网站[点这里](https://www.grabient.com/)\n2. 了解伪元素的使用方法[::before](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before)\n3. 了解 css3 过渡[transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)\n4. 了解 css3 背景渐变[background-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)\n\n## 如何在 hover 时 给背景增加过渡\ncss3 无法对 background-image 进行过渡 所以无法使用 `transition : background-image 0.6s` 我们可以通过对元素增加一个相同大小的伪元素 通过用户 hover 时 切换父元素 和 伪元素的透明度 由于可以给 `opacity` 增加过渡效果 从而达到预期效果\n## 代码展示\n```html\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>A beautiful button</title>\n    <style>\n      .button {\n        /* 相对定位 让伪元素 利用button父元素元素进行定位 */\n        position: relative;\n        padding: 10px 30px;\n        font-size: 18px;\n        font-weight: bold;\n        color: #fff;\n        border: none;\n        border-radius: 8px;\n        /* 给button 一个过渡效果*/\n        transition: all 0.6s ease-in-out;\n        cursor: pointer;\n        /* 指定一个 z-index 不能让伪元素的z坐标值大于button 不然字体就会被伪元素覆盖*/\n        z-index: 0;\n        /* 背景渐变色 */\n        background-image: linear-gradient(300deg, #00dbde 0%, #6284ff 50%, #ff0000 100%);\n      }\n\n      .button:hover {\n        transform: translateY(-3px);\n      }\n\n      .button::before {\n        content: \"\";\n        /* 伪元素 占满整个父元素button */\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        /* 开始时 伪元素的透明度位 0 完全透明 */\n        opacity: 0;\n        z-index: -1;\n        border-radius: 8px;\n        /* 给透明度增加过渡 */\n        transition: opacity 0.6s ease-in-out;\n        background-image: linear-gradient(135deg, #00dbde 0%, #6284ff 50%, #ff0000 100%);\n      }\n\n      .button:hover::before {\n        /* 在button hover 后 让伪元素的透明度为1 完全不透明 */\n        opacity: 1;\n      }\n    </style>\n  </head>\n\n  <body>\n    <button class=\"button\">Hover me</button>\n  </body>\n</html>\n```\n效果图：![](https://img.lijianyang.vip/2024-05/2d1f65a9c3aca8af8f5bb7880d.jpg)\n\n', 'https://img.lijianyang.vip/2024-05/7cc5bbb644f0e56c17941f8989.jpg', 1, 1, 1, NULL, '2024-05-28 16:35:10', '2024-05-28 16:35:10', 239, '', 0, 52631, 1);
INSERT INTO `blog_article` VALUES (50, 'Axios上传文件监听进度', 254, 4, '## 设置请求头 axios请求拦截中修改content-type\n\naxios提供上传进度回调 `onUploadProgress`\n```javascript\n/**\n * 上传图片\n *\n * @param data 图片对象\n * @param cb 处理进度条回调\n * @returns\n */\nexport function uploadImg(data: FormData, cb?: (progressEvent: AxiosProgressEvent) => void) {\n  return request<{ url: string }>({\n    url: \'/upload/img\',\n    method: \'POST\',\n    data,\n    headers: {\n      \'Content-Type\': \'multipart/form-data\'\n    },\n    onUploadProgress: progressEvent => {\n      cb && cb(progressEvent);\n    }\n  });\n}\n```\n\n## 处理进度百分比\n\n```javascript\nfunction onHandleUploadProgress(progressEvent: AxiosProgressEvent) {\n  UploadList.value[0].percentage = Math.round((progressEvent.loaded / (progressEvent.total as number)) * 10000) / 100.0;\n}\n```', 'https://img.lijianyang.vip/2024-05/c87b85439ece539152c5712331.png', 0, 1, 1, NULL, '2024-05-28 17:20:02', '2024-05-28 17:20:02', 154, 'Axios上传文件监听进度', 0, 4757, NULL);
INSERT INTO `blog_article` VALUES (51, 'Test', 254, 5, '这是一篇测试的文章', 'https://img.lijianyang.vip/2024-05/d13b7954fa44b04a8eb18a9c7a.jpg', 0, 2, 1, NULL, '2024-05-28 17:40:22', '2024-05-28 17:40:22', 0, '测试描述', 0, 0, NULL);
INSERT INTO `blog_article` VALUES (52, '不要再写满屏import导入啦！', 254, 4, '## 使用模块重导（Re-export）\n模块重导是一种通用的技术。在腾讯、字节、阿里等各大厂的组件库中都有大量使用。如：字节的arco-design组件库中的[组件](https://github.com/arco-design/arco-design/blob/main/components/index.tsx)。通过重导在comonents/index.tsx文件暴露所有组件，在使用时一个import就可以使用N个组件了。\n```javascript\n// 不使用重导\nimport Modal from \'@arco-design/web-react/es/Modal\'\nimport Checkbox from \'@arco-design/web-react/es/Checkbox\'\nimport Message from \'@arco-design/web-react/es/Message\'\n...\n\n// 使用模块重导\nimport { Modal, Checkbox, Message} from \'@arco-design/web-react\'\n```\n![](https://img.lijianyang.vip/2024-05/bd31796043c47f21b4b2871b01.png)\n\n**Re-export**一般用于收拢同类型的模块、一般都是以文件夹为单位，如components、routes、utils、hooks、stories等都通过各自的index.tsx暴露，这样就能极大程度的简化**导入路径、提升代码可读性、可维护性。**\n\n### Re-export的几种形式\n1、 直接重导出\n 直接从另一个模块重导出特定的成员。\n ```javascript\n export { foo, bar } from \'./moduleA\';\n  ```\n2、重命名并重导出（含默认导出）\n从另一个模块导入成员，可能会重命名它们，然后再导出。\n\n默认导出也可以重命名并重导出\n```javascript\n// 通过export导出的\nexport { foo as newFoo, bar as newBar } from \'./moduleA\';\n// 通过export default导出的\nexport { default as ModuleDDefault } from \'./moduleD\';\n```\n', 'https://img.lijianyang.vip/2024-05/20e43edf9c567ec48087d6e29f.png', 0, 1, 2, 'https://juejin.cn/post/7344571285848768524', '2024-05-29 09:40:25', '2024-05-29 09:40:25', 209, '不要再写满屏import导入啦！', 0, 48439, NULL);

-- ----------------------------
-- Table structure for blog_article_tag
-- ----------------------------
DROP TABLE IF EXISTS `blog_article_tag`;
CREATE TABLE `blog_article_tag`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NULL DEFAULT NULL COMMENT '文章id',
  `tag_id` int NULL DEFAULT NULL COMMENT '标签id',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 253 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_article_tag
-- ----------------------------
INSERT INTO `blog_article_tag` VALUES (246, 49, 28, '2024-05-28 16:35:10', '2024-05-28 16:35:10');
INSERT INTO `blog_article_tag` VALUES (247, 50, 23, '2024-05-28 17:20:02', '2024-05-28 17:20:02');
INSERT INTO `blog_article_tag` VALUES (248, 51, 27, '2024-05-28 17:40:22', '2024-05-28 17:40:22');
INSERT INTO `blog_article_tag` VALUES (249, 51, 29, '2024-05-28 17:40:22', '2024-05-28 17:40:22');
INSERT INTO `blog_article_tag` VALUES (250, 51, 28, '2024-05-28 17:40:22', '2024-05-28 17:40:22');
INSERT INTO `blog_article_tag` VALUES (251, 52, 23, '2024-05-29 09:40:25', '2024-05-29 09:40:25');
INSERT INTO `blog_article_tag` VALUES (252, 52, 30, '2024-05-29 09:40:25', '2024-05-29 09:40:25');

-- ----------------------------
-- Table structure for blog_category
-- ----------------------------
DROP TABLE IF EXISTS `blog_category`;
CREATE TABLE `blog_category`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '分类名称 唯一',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `category_name`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_2`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_3`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_4`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_5`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_6`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_7`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_8`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_9`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_10`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_11`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_12`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_13`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_14`(`category_name` ASC) USING BTREE,
  UNIQUE INDEX `category_name_15`(`category_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_category
-- ----------------------------
INSERT INTO `blog_category` VALUES (4, '前端', '2024-05-24 16:14:03', '2024-05-24 16:14:05');
INSERT INTO `blog_category` VALUES (5, '后端', '2024-05-24 16:14:18', '2024-05-24 16:14:21');
INSERT INTO `blog_category` VALUES (6, 'React', '2024-05-27 10:31:52', '2024-05-27 10:31:52');
INSERT INTO `blog_category` VALUES (7, 'MySQL', '2024-05-27 10:33:05', '2024-05-27 10:37:10');
INSERT INTO `blog_category` VALUES (20, 'vue', '2024-05-30 13:49:26', '2024-05-30 13:49:26');

-- ----------------------------
-- Table structure for blog_comment
-- ----------------------------
DROP TABLE IF EXISTS `blog_comment`;
CREATE TABLE `blog_comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int NULL DEFAULT NULL COMMENT '评论父级id',
  `for_id` int NULL DEFAULT NULL COMMENT '评论的对象id 比如说说id、文章id等',
  `type` int NULL DEFAULT NULL COMMENT '评论类型 1 文章 2 说说 3 留言 ...',
  `from_id` int NULL DEFAULT NULL COMMENT '评论人id',
  `from_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '评论人昵称',
  `from_avatar` varchar(555) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '评论人头像',
  `to_id` int NULL DEFAULT NULL COMMENT '被回复的人id',
  `to_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '被回复人的昵称',
  `to_avatar` varchar(555) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '被回复人的头像',
  `content` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '评论内容',
  `thumbs_up` int NULL DEFAULT 0 COMMENT '评论点赞数',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 380 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_comment
-- ----------------------------

-- ----------------------------
-- Table structure for blog_config
-- ----------------------------
DROP TABLE IF EXISTS `blog_config`;
CREATE TABLE `blog_config`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `blog_name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '小张的博客' COMMENT '博客名称',
  `blog_avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT 'https://mrzym.gitee.io/blogimg/html/rabbit.png' COMMENT '博客头像',
  `avatar_bg` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '博客头像背景图',
  `personal_say` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '个人签名',
  `notice` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '博客公告',
  `qq_link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'qq链接',
  `we_chat_link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '微信链接',
  `github_link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'github链接',
  `gitee_link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'git_ee链接',
  `bilibili_link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'bilibili链接',
  `view_time` bigint NULL DEFAULT 0 COMMENT '博客被访问的次数',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  `we_chat_group` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '微信群图片',
  `qq_group` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'qq群图片',
  `we_chat_pay` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '微信收款码',
  `ali_pay` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '支付宝收款码',
  `banner` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '首页背景图',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_config
-- ----------------------------
INSERT INTO `blog_config` VALUES (5, 'Lee Malachi Blog', 'https://img.lijianyang.vip/2024-05/892be3f3107dc1a12444e1b835.jpg', NULL, 'A true master always has the heart of an apprentice', 'I’m a Front-end development engineer, javascript, css, vue, nodejs python', NULL, NULL, 'https://github.com/sh-web-lee', 'https://gitee.com/leefath', NULL, 0, '2024-05-30 14:03:00', '2024-05-31 15:45:11', NULL, NULL, NULL, NULL, 'https://img.lijianyang.vip/blog/home-banner.jpg');

-- ----------------------------
-- Table structure for blog_header
-- ----------------------------
DROP TABLE IF EXISTS `blog_header`;
CREATE TABLE `blog_header`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `bg_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '背景图',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  `route_name` varchar(555) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '路由名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_header
-- ----------------------------

-- ----------------------------
-- Table structure for blog_like
-- ----------------------------
DROP TABLE IF EXISTS `blog_like`;
CREATE TABLE `blog_like`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NULL DEFAULT NULL COMMENT '点赞类型 1 文章 2 说说 3 留言 4 评论',
  `for_id` int NULL DEFAULT NULL COMMENT '点赞的id 文章id 说说id 留言id',
  `user_id` int NULL DEFAULT NULL COMMENT '点赞用户id',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 291 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_like
-- ----------------------------

-- ----------------------------
-- Table structure for blog_links
-- ----------------------------
DROP TABLE IF EXISTS `blog_links`;
CREATE TABLE `blog_links`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '网站名称',
  `site_desc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '网站描述',
  `site_avatar` varchar(555) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '网站头像',
  `url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '网站地址',
  `status` int NULL DEFAULT NULL COMMENT '友链状态 1 待审核 2 审核通过',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '申请者id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_links
-- ----------------------------

-- ----------------------------
-- Table structure for blog_message
-- ----------------------------
DROP TABLE IF EXISTS `blog_message`;
CREATE TABLE `blog_message`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '标签',
  `message` varchar(555) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '留言内容',
  `color` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '#676767' COMMENT '字体颜色',
  `font_size` int NULL DEFAULT 12 COMMENT '字体大小',
  `bg_color` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '背景颜色',
  `bg_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '背景图片',
  `user_id` int NULL DEFAULT NULL COMMENT '留言用户的id',
  `like_times` int NULL DEFAULT 0 COMMENT '点赞次数',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  `font_weight` int NULL DEFAULT 500 COMMENT '字体宽度',
  `nick_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '游客用户的昵称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 92 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_message
-- ----------------------------

-- ----------------------------
-- Table structure for blog_notify
-- ----------------------------
DROP TABLE IF EXISTS `blog_notify`;
CREATE TABLE `blog_notify`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(555) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '通知内容',
  `user_id` int NULL DEFAULT NULL COMMENT '通知给谁',
  `type` int NULL DEFAULT NULL COMMENT '通知类型 1 文章 2 说说 3 留言 4 友链',
  `to_id` int NULL DEFAULT NULL COMMENT '说说或者是文章的id 用于跳转',
  `isView` int NULL DEFAULT 1 COMMENT '是否被查看 1 没有 2 已经查看',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 365 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_notify
-- ----------------------------

-- ----------------------------
-- Table structure for blog_photo
-- ----------------------------
DROP TABLE IF EXISTS `blog_photo`;
CREATE TABLE `blog_photo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `album_id` int NULL DEFAULT NULL COMMENT '相册 id 属于哪个相册',
  `url` varchar(555) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '图片地址',
  `status` int NULL DEFAULT 1 COMMENT '状态 1 正常 2 回收站',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 301 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_photo
-- ----------------------------

-- ----------------------------
-- Table structure for blog_photo_album
-- ----------------------------
DROP TABLE IF EXISTS `blog_photo_album`;
CREATE TABLE `blog_photo_album`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `album_name` varchar(26) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '相册名称',
  `description` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '相册描述信息',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  `album_cover` varchar(555) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '相册封面',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_photo_album
-- ----------------------------

-- ----------------------------
-- Table structure for blog_recommend
-- ----------------------------
DROP TABLE IF EXISTS `blog_recommend`;
CREATE TABLE `blog_recommend`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '推荐网站标题',
  `link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '网站地址',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_recommend
-- ----------------------------

-- ----------------------------
-- Table structure for blog_tag
-- ----------------------------
DROP TABLE IF EXISTS `blog_tag`;
CREATE TABLE `blog_tag`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '标签名称 唯一',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tag_name`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_2`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_3`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_4`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_5`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_6`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_7`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_8`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_9`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_10`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_11`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_12`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_13`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_14`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_15`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_16`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_17`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_18`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_19`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_20`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_21`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_22`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_23`(`tag_name` ASC) USING BTREE,
  UNIQUE INDEX `tag_name_24`(`tag_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_tag
-- ----------------------------
INSERT INTO `blog_tag` VALUES (21, '阿里云对象存储OSS', '2024-05-28 10:29:08', '2024-05-28 10:32:38');
INSERT INTO `blog_tag` VALUES (22, 'Nginx', '2024-05-28 10:32:00', '2024-05-28 10:32:23');
INSERT INTO `blog_tag` VALUES (23, 'vue3', '2024-05-28 15:13:05', '2024-05-28 15:13:05');
INSERT INTO `blog_tag` VALUES (28, 'css', '2024-05-28 16:35:10', '2024-05-28 16:35:10');
INSERT INTO `blog_tag` VALUES (30, 'javascript', '2024-05-29 09:40:25', '2024-05-29 09:40:25');
INSERT INTO `blog_tag` VALUES (31, 'Test', '2024-05-29 09:51:16', '2024-05-29 09:51:16');

-- ----------------------------
-- Table structure for blog_talk
-- ----------------------------
DROP TABLE IF EXISTS `blog_talk`;
CREATE TABLE `blog_talk`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL COMMENT '发布说说的用户id',
  `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '说说内容',
  `status` int NULL DEFAULT 1 COMMENT '说说状态 1 公开 2 私密 3 回收站',
  `is_top` int NULL DEFAULT 2 COMMENT '是否置顶 1 置顶 2 不置顶',
  `like_times` int NULL DEFAULT 0 COMMENT '点赞次数',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_talk
-- ----------------------------

-- ----------------------------
-- Table structure for blog_talk_photo
-- ----------------------------
DROP TABLE IF EXISTS `blog_talk_photo`;
CREATE TABLE `blog_talk_photo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `talk_id` int NULL DEFAULT NULL COMMENT '说说的id',
  `url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '图片地址',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 84 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_talk_photo
-- ----------------------------

-- ----------------------------
-- Table structure for blog_user
-- ----------------------------
DROP TABLE IF EXISTS `blog_user`;
CREATE TABLE `blog_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '账号',
  `password` char(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '密码',
  `roles` char(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '2' COMMENT '用户角色 admin 管理员 user 普通用户',
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '用户邮箱，唯一',
  `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  `qq` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '' COMMENT '用户QQ 用于联系',
  `ip` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '' COMMENT 'ip属地',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 256 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog_user
-- ----------------------------
INSERT INTO `blog_user` VALUES (254, 'lee_malachi', '$2a$10$W/8eDLMWsHfjMWRvu4NSfeuOhxs8tkAxUC3GjMivfCuk6FclXiDmq', 'admin', 'shweblee@gmail.com', 'http://mrzym.top/online/9bb507f4bd065759a3d093d04.webp', '2024-05-24 15:57:35', '2024-06-06 11:02:44', '', '1');
INSERT INTO `blog_user` VALUES (255, 'test', '$2a$10$uDwUDNdPLfGhX4QE6O8QrOhoHGNOOEV4CxIcqgq0UGCb3NqzKcrKC', 'user', 'test123@gmail.com', 'http://mrzym.top/online/9bb507f4bd065759a3d093d04.webp', '2024-05-27 14:13:29', '2024-05-27 15:02:38', '', '1');

SET FOREIGN_KEY_CHECKS = 1;
