/**
 * Namespace Env
 *
 * It is used to declare the type of the import.meta object
 */
declare namespace Env {
  /** THe Router history mode */
  type RouterHistoryMode = 'hash' | 'history' | 'memory';
  /** Interface for import.meta */
  interface ImportMeta extends ImportMetaEnv {
    /** The base url of the application */
    readonly VITE_BASE_URL: string;
    /** The title of the application */
    readonly VITE_APP_TITLE: string;
    /** The router history mode */
    readonly VITE_ROUTER_HISTORY_MODE?: RouterHistoryMode;
    /** The prefix of the iconify icon */
    readonly VITE_ICON_PREFIX: 'icon';
    /**
     * The prefix of the local icon
     *
     * This prefix is start with the icon prefix
     */
    readonly VITE_ICON_LOCAL_PREFIX: 'local-icon';
    /** backend service base url */
    readonly VITE_SERVICE_BASE_URL: string;
    /**
     * success code of backend service
     *
     * when the code is received, the request is successful
     */
    readonly VITE_SERVICE_SUCCESS_CODE: number;
    /**
     * other backend service base url
     *
     * the value is a json
     */
    readonly VITE_OTHER_SERVICE_BASE_URL: string;
    /**
     * Whether to enable the http proxy
     *
     * Only valid in the development environment
     */
    readonly VITE_HTTP_PROXY?: CommonType.YesOrNo;
    /** Used to differentiate storage across different domains */
    readonly VITE_STORAGE_PREFIX?: string;
  }
}
