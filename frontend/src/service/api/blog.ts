import { request } from '../request';

/** 获取分类字典 */
export function fetchArticleCat() {
  return request<ApiGlobal.SearchType<Api.Blog.Category>>({
    url: '/category/getCategoryDictionary',
    method: 'get'
  });
}

/**
 * 条件分页查找分类列表
 *
 * @param params
 * @returns
 */
export function fetchCategoryList(data: Api.SystemManage.ListCommonSearchParams) {
  return request<Api.SystemManage.CategoryList>({
    url: '/category/getCategoryList',
    method: 'POST',
    data
  });
}

/**
 * 新增分类
 *
 * @param data
 * @returns
 */
export function createCategory(data: Api.Blog.Category) {
  return request({
    url: '/category/add',
    method: 'POST',
    data
  });
}

/**
 * 编辑分类
 *
 * @param data
 * @returns
 */
export function updateCategory(data: Api.Blog.Category) {
  return request({
    url: '/category/update',
    method: 'PUT',
    data
  });
}

/**
 * 删除分类
 *
 * @param data {ids: number[]} 删除分类的id
 * @returns
 */
export function deleteCategory(data: { ids: number[] }) {
  return request({
    url: 'category/delete',
    method: 'POST',
    data
  });
}

/**
 * 分页查询标签
 *
 * @param data
 * @returns
 */
export function fetchTagList(data: Api.SystemManage.ListCommonSearchParams) {
  return request<Api.SystemManage.TagList>({
    url: '/tag/getTagList',
    method: 'POST',
    data
  });
}

/** 获取标签字典 */
export function fetchArticleTags() {
  return request<ApiGlobal.SearchType<Pick<Api.Blog.ArticleTag, 'id' | 'tag_name'>>>({
    url: '/tag/getTagDictionary',
    method: 'GET'
  });
}

/**
 * 新增标签
 *
 * @param data
 * @returns
 */
export function addTag(data: Pick<Api.Blog.ArticleTag, 'tag_name'>) {
  return request({
    url: '/tag/add',
    method: 'POST',
    data
  });
}

/**
 * 编辑标签
 *
 * @param data
 * @returns
 */
export function updateTag(data: Pick<Api.Blog.ArticleTag, 'id' | 'tag_name'>) {
  return request({
    url: '/tag/update',
    method: 'PUT',
    data
  });
}

/**
 * 删除标签
 *
 * @param data id数组
 * @returns
 */
export function deleteTag(data: { ids: number[] }) {
  return request({
    url: '/tag/delete',
    method: 'POST',
    data
  });
}

export function uploadCover(data: FormData) {
  return request<{ url: string }>({
    url: '/aliyun/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function addArticle(data: Api.Blog.CreateArticle) {
  return request({
    url: '/article/add',
    method: 'post',
    data
  });
}

export function fetchArticleList(data: Api.SystemManage.ArticleSearchParams) {
  return request<Api.SystemManage.ArticleList>({
    url: '/article/getArticleList',
    method: 'POST',
    data
  });
}

/**
 * 更新博客网站设置
 *
 * @param data
 * @returns
 */
export function updateBlogSiteConfig(data: Api.Blog.SiteInfo) {
  return request({
    url: '/blog/config/update',
    method: 'POST',
    data
  });
}

/** 博客网站信息 */
export function fetchBlogSiteConfig() {
  return request({
    url: '/blog/config'
  });
}
