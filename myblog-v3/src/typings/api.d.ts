declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current: number;
      /** page size */
      size: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      items: T[];
    }
  }

  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;
    /** home article list */
    type ArticleList = Common.PaginatingQueryRecord<ArticleManage.Article>;
    /** article detail recommen */
    type RecommendArticleList = {
      previous: ArticleManage.RecommendArticle | null;
      next: ArticleManage.RecommendArticle | null;
      recommend: ArticleManage.RecommendArticle[];
    };

    type CategoryList = Pick<Common.PaginatingQueryRecord<CategoryManage.Category>, 'items' | 'total'>;

    interface SystemConfig {
      /** 首页banner背景 */
      banner: string;
      /** 网站头像 */
      blog_avatar: string;
      /** 网站名称 */
      blog_name: string;
      gitee_link: string;
      github_link: string;
      /** 公告 */
      notice: string;
      /** 个签 */
      personal_say: string;
    }

    interface SystemStatistic {
      articleCount: number;
      categoryCount: number;
      tagCount: number;
    }
  }

  namespace ArticleManage {
    interface Article {
      id: number;
      /** 作者 */
      author_id: number;
      /** 文章标题 */
      article_title: string;
      /** 文章内容 */
      article_content: string;
      /** 文章封面 */
      article_cover: string;
      /** 文章描述 */
      article_description: string;
      /** 文章分类id */
      category_name: string | null;
      /** 文章标签 */
      tags: string[];
      /** 是否置顶 1 置顶 0 取消置顶 */
      is_top: 1 | 0;
      /** 文章状态 1 公开 2 私密 3 草稿箱 */
      status: 1 | 2 | 3;
      /** 文章类型 1 原创 2 转载 3 翻译 */
      type: 1 | 2 | 3;
      /** 转载原文链接 */
      origin_url?: string;
      createdAt: string;
      updatedAt: string;
      /** 分类名称 */
      categoryName: string;
      /** 标签 */
      tagNameList: string[];
      /** 点赞数 */
      thumbs_up_times: number;
      /** 浏览量 */
      view_times: number;
      /** 阅读时长 */
      reading_duration: number;
    }

    type RecommendArticle = Pick<Article, 'article_cover' | 'article_title' | 'id' | 'createdAt'>;
  }

  namespace CategoryManage {
    interface Category {
      id: number;
      name: string;
    }
  }
}
