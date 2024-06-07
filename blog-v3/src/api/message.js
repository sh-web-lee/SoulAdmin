import http from "@/config/request";

/** 获取留言列表 */
export const getMessageList = (data) => {
  return new Promise((resolve, reject) => {
    http.post("/message/getMessageList", data).then((res) => {
      resolve(res);
    });
  });
};

/** 新增留言 */
export const addMessage = (data) => {
  return new Promise((resolve, reject) => {
    http.post("/message/add", data).then((res) => {
      resolve(res);
    });
  });
};

/** 编辑留言 */
export const updateMessage = (data) => {
  return new Promise((resolve, reject) => {
    http.post("/message/update", data).then((res) => {
      resolve(res);
    });
  });
};

/** 点赞留言 */
export const likeMessage = (id) => {
  return new Promise((resolve, reject) => {
    http.put("/message/like/" + id, {}).then((res) => {
      resolve(res);
    });
  });
};

/** 取消点赞留言 */
export const cancelLikeMessage = (id) => {
  return new Promise((resolve, reject) => {
    http.put("/message/cancelLike/" + id, {}).then((res) => {
      resolve(res);
    });
  });
};

/** 删除留言 */
export const deleteMessage = (id) => {
  return new Promise((resolve, reject) => {
    http.put("/message/delete", { idList: [id] }).then((res) => {
      resolve(res);
    });
  });
};

/** 获取热门标签 */
export const getMessageTag = () => {
  return new Promise((resolve, reject) => {
    http.get("/message/getHotTagList", {}).then((res) => {
      resolve(res);
    });
  });
};
