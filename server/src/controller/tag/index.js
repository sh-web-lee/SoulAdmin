const { createTag, updateTag, deleteTags, getTagList, getTagDictionary } = require("../../service/tag/index")

const { result, listResult, ERRORCODE, throwError } = require("../../result/index")
const errorCode = ERRORCODE.TAG
/**
 * 标签控制器
 */
class TagController {
  /**
   * 新增标签
   */
  async addTag(ctx) {
    try {
      const { tag_name } = ctx.request.body;
      let res = await createTag(tag_name)
      ctx.body = result("success", {
        id: res.id,
        tag_name: res.tag_name,
      })
    } catch (err) {
      return ctx.app.emit("error", throwError(errorCode, "新增标签失败"), ctx)
    }
  }

  /**
   * 修改标签
   */
  async updateTag(ctx) {
    try {
      let res = await updateTag(ctx.request.body)
      ctx.body = result("修改标签成功", res)
    } catch (err) {
      return ctx.app.emit("error", throwError(errorCode, "修改标签失败"), ctx)
    }
  }

  /**
   * 删除标签
   */
  async deleteTags(ctx) {
    try {
      const { ids:tagIdList } = ctx.request.body
      let res = await deleteTags(tagIdList)
      ctx.body = result("success", {
        updateNum: res,
      })
    } catch (err) {
      console.error(err)
      return ctx.app.emit("error", throwError(errorCode, "删除标签失败"), ctx)
    }
  }

  /**
   * 分页查找标签
   */
  async getTagList(ctx) {
    try {
      const { current, size, info:tag_name } = ctx.request.body
      let res = await getTagList({ current, size, tag_name })
      ctx.body = result("success", res)
    } catch (err) {
      return ctx.app.emit("error", throwError(errorCode, "分页查找标签失败"), ctx)
    }
  }

  /**
   * 获取标签字典
   */
  async getTagDictionary(ctx) {
    try {
      let res = await getTagDictionary()

      ctx.body = listResult("success", res)
    } catch (err) {
      return ctx.app.emit("error", throwError(errorCode, "获取标签字典失败"), ctx)
    }
  }
}

module.exports = new TagController()
