import { request } from '../request';

/**
 * 获取文章列表
 *
 * @param data
 * @returns
 */
export function fetchArticleList(data: Api.SystemManage.CommonSearchParams) {
  const { current, size } = data;
  return request<Api.SystemManage.ArticleList>({
    url: `/article/front/articleList/${current}/${size}`
  });
}

/** 网站配置信息 */
export function fetchSiteConfig() {
  return request<Api.SystemManage.SystemConfig>({
    url: '/blog/config'
  });
}

/** 获取网站统计数据 */
export function fetchStatistic() {
  return request<Api.SystemManage.SystemStatistic>({
    url: '/statistic'
  });
}
