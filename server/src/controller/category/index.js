const { createCategory, updateCategory, deleteCategories, getCategoryList, getCategoryDictionary } = require("../../service/category/index")

const { result, listResult, ERRORCODE, throwError } = require("../../result/index")
const errorCode = ERRORCODE.CATEGORY
/**
 * 分类控制器
 */
class CategoryController {
  /**
   * 新增分类
   */
  async addCategory(ctx) {
    try {
      let res = await createCategory(ctx.request.body)
      ctx.body = result("success", {
        id: res.id,
        category_name: res.category_name,
      })
    } catch (err) {
      return ctx.app.emit("error", throwError(errorCode, "新增分类失败"), ctx)
    }
  }

  /**
   * 修改分类
   */
  async updateCategory(ctx) {
    try {
      let res = await updateCategory(ctx.request.body)
      ctx.body = result("success", res)
    } catch (err) {
      return ctx.app.emit("error", throwError(errorCode, "修改分类失败"), ctx)
    }
  }

  /**
   * 删除分类
   */
  async deleteCategories(ctx) {
    try {
      const { ids:categoryIdList } = ctx.request.body
      let res = await deleteCategories(categoryIdList)
      ctx.body = result("success", {
        updateNum: res,
      })
    } catch (err) {
      console.error(err)
      return ctx.app.emit("error", throwError(errorCode, "删除分类失败"), ctx)
    }
  }

  /**
   * 条件分页查找分类列表
   */
  async getCategoryList(ctx) {
    try {
      const { current, size, info:category_name } = ctx.request.body
      let res = await getCategoryList({ current, size, category_name })
      ctx.body = result("success", res)
    } catch (err) {
      return ctx.app.emit("error", throwError(errorCode, "分页查找分类失败"), ctx)
    }
  }

  /**
   * 获取分类字典
   */
  async getCategoryDictionary(ctx) {
    try {
      let res = await getCategoryDictionary()

      ctx.body = listResult("success", res)
    } catch (err) {
      return ctx.app.emit("error", throwError(errorCode, "获取分类字典失败"), ctx)
    }
  }
}

module.exports = new CategoryController()
