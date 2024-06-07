declare namespace ApiGlobal {
  /** 查询列表返回格式 */
  interface SearchType<K> {
    items: K[] | null;
    total: number;
  }
}

/**
 * Namespace Api
 *
 * All backend api type
 */
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

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = '1' | '2';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record creator */
      // createBy: string;
      /** record create time */
      createdAt: string;
      /** record updater */
      // updateBy: string;
      /** record update time */
      updatedAt: string;
      /** record status */
      // status: EnableStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      id: number;
      username: string;
      refreshToken: string;
    }

    interface UserInfo {
      avatar: string;
      username: string;
      email: string;
      roles: string[];
      id: number;
      buttons: string[];
    }
  }

  /**
   * Namespace Blog
   *
   * backend api module: "Blog"
   */
  namespace Blog {
    interface CreateArticle {
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
    }

    type Article = Api.Common.CommonRecord<
      Pick<
        CreateArticle,
        | 'article_content'
        | 'article_cover'
        | 'article_description'
        | 'article_title'
        | 'is_top'
        | 'origin_url'
        | 'status'
        | 'type'
        | 'tags'
      > & {
        category: string | null;
        author: string;
      }
    >;

    interface Category {
      id: number;
      name: string;
    }

    interface CategoryItem extends Category {
      createdAt: string;
      updatedAt: string;
    }

    interface ArticleTag {
      id: number;
      tag_name: string;
      createdAt: string;
      updatedAt: string;
    }

    interface SiteInfo {
      id?: number;
      blog_name: string;
      /** 个签 */
      personal_say: string;
      github_link: string;
      gitee_link: string;
      blog_avatar: string;
      avatar_bg: string;
      /** 公告 */
      notice: string;
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * Namespace Site
   *
   * backend api module: "Site"
   */

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** role */
    type Role = Common.CommonRecord<{
      /** role name */
      roleName: string;
      /** role code */
      roleCode: string;
      /** role description */
      roleDesc: string;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'roleName' | 'roleCode'> & CommonSearchParams
    >;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '1' | '2';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      username: string;
      /** user avatar */
      avatar: string;
      /** role */
      roles: string;
      /** user email */
      email: string;
      qq: string;
      /** create date */
      createdAt: string;
      updatedAt: string;
      ip_address: string;
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'username' | 'qq' | 'email' | 'roles'> & CommonSearchParams
    >;

    type CategorySearchParams = CommonType.RecordNullable<Pick<Blog.CategoryItem, 'name'> & CommonSearchParams>;

    type ArticleSearchParams = CommonType.RecordNullable<
      Pick<Blog.Article, 'article_title' | 'category' | 'createdAt' | 'is_top' | 'status' | 'tags'> & CommonSearchParams
    >;

    type ListCommonSearchParams = CommonSearchParams & {
      info?: string;
    };

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /** article list */
    type ArticleList = Common.PaginatingQueryRecord<Api.Blog.Article>;

    type CategoryList = Common.PaginatingQueryRecord<Blog.CategoryItem>;

    type TagList = Common.PaginatingQueryRecord<Blog.ArticleTag>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = '1' | '2';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'keepAlive'
      | 'constant'
      | 'order'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
    >;

    type Menu = Common.CommonRecord<{
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };
  }
}
