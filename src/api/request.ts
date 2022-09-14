import instance, { WakAxiosRequestConfig, WakAxiosResponseMore } from "./axios";
import { AxiosInstance } from "axios";

/**
 * 对请求方式和请求参数的处理
 * 兼容ts
 */
class Request {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * 封装get,兼容自定义config
   * @param url
   * @param config
   */
  public get(
    url: string,
    config: WakAxiosRequestConfig
  ): Promise<WakAxiosResponseMore> {
    return this.instance.get(url, config);
  }

  /**
   * 封装post兼容自定义config
   * @param url
   * @param data
   * @param config
   */

  public post(
    url: string,
    data: any = {},
    config?: WakAxiosRequestConfig
  ): Promise<WakAxiosResponseMore> {
    return this.instance.post(url, data, config);
  }

  /**
   * 封装request兼容自定义config
   * @param config
   */
  public request(config: WakAxiosRequestConfig): Promise<WakAxiosResponseMore> {
    return this.instance(config);
  }
}

export default new Request(instance);
