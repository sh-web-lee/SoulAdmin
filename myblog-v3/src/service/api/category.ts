import { request } from '../request';

/** 获取分类 */
export function fetchCategories() {
  return request<Api.SystemManage.CategoryList>({
    url: '/category/getCategoryDictionary'
  });
}
