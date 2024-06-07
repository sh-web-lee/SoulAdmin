const { createArticleTags } = require("../../service/article/articleTag")
const { getOneCategory, createCategory } = require("../../service/category/index")
const { createTag, getOneTag } = require("../../service/tag/index")
/**
 * 新增和编辑文章关于分类的公共方法
 * @param {*} id
 */
const createCategoryOrReturn = async (category_name) => {
  let finalId
  let oneTag = await getOneCategory({ category_name })
  if (oneTag) {
    finalId = oneTag.id
  } else {
    let newTag = await createCategory({ id })
    finalId = newTag.id
  }

  return finalId
}

const createTagOrReturn = async (tagsNameList) => {
  let finalIds = [];
  tagsNameList.forEach(async tag_name => {
    let oneTag = await getOneTag({ tag_name })
    if (oneTag) {
      finalIds.push(oneTag.id)
    } else {
      let newTag = await createTag({ tag_name })
      finalIds.push(newTag.id)
    }
  })

  return finalIds;
  // if (oneTag) {
  //   finalId = oneTag.id
  // } else {
  //   let newTag = await createTag({ id })
  //   finalId = newTag.id
  // }

  // return finalId
}



/**
 * 进行添加文章分类与标签关联的公共方法
 * @param {*} articleId
 * @param {*} tagList
 */
const createArticleTagByArticleId = async (articleId, tagList) => {
  let resultList = []
  // 先将新增的tag进行保存，拿到tag的id，再进行标签 文章关联
  let promiseList = tagList.map(async tag_name => {
    let res
    let one = await getOneTag({ tag_name })
    res = one || await createTag(tag_name)
    return res
  })

  let newTagList = []

  // 组装添加了标签id后的标签列表
  await Promise.all(promiseList).then(res => {
    res.forEach(r => {
      if (r) {
        let i = tagList.findIndex(tag_name => tag_name == r.tag_name)
        if (i !== -1) {
          newTagList.push(r.id)
        }
      }
    })

  })

  // 文章id和标签id 关联
  if (articleId) {
    let articleTagList = newTagList.map(id => {
      // 组装文章和标签的关联表
      let obj = {
        article_id: articleId,
        tag_id: id,
      }
      return obj
    })
    // 批量新增文章标签关联
    resultList = await createArticleTags(articleTagList)
  }


  return resultList
}

module.exports = {
  createCategoryOrReturn,
  createTagOrReturn,
  createArticleTagByArticleId,
}
