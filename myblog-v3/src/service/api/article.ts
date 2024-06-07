import { request } from '../request';

/**
 * 获取指定文章详情
 *
 * @param id
 * @returns
 */
export function fetchArticleDetailById(id: number) {
  return request<Api.ArticleManage.Article>({
    url: `/article/getArticleById/${id}`
  });
}

/**
 * 根据文章id获取上下一篇文章 和推荐文章
 *
 * @param id
 * @returns
 */
export function fetchRecommendArticleById(id: number) {
  return request<Api.SystemManage.RecommendArticleList>({
    url: `/article/getRecommendArticleById/${id}`
  });
}
