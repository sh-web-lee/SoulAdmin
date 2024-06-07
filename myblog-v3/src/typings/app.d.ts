/** The global namespace for the app */
declare namespace App {
  /** Service namespace */
  namespace Service {
    /** Other baseURL key */
    type OtherBaseURLKey = 'demo';
    interface ServiceConfigItem {
      /** The backend service base url */
      baseURL: string;
      /** The proxy pattern of the backend service base url */
      proxyPattern: string;
    }
    interface OtherServiceConfigItem extends ServiceConfigItem {
      key: OtherBaseURLKey;
    }
    interface SimpleServiceConfig extends Pick<ServiceConfigItem, 'baseURL'> {
      other: Record<OtherBaseURLKey, string>;
    }

    /** The backend service config */
    interface ServiceConfig extends ServiceConfigItem {
      /** Other backend service config */
      other: OtherServiceConfigItem[];
    }

    /** The backend service response data */
    type Response<T = unknown> = {
      /** The backend service response code */
      code: number;
      /** The backend service response message */
      msg: string;
      /** The backend service response data */
      data: T;
    };
  }

  namespace Theme {
    type ThemeMode = UnionKey.ThemeScheme;
  }
}
