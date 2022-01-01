import { constants } from "../commons";
import { apiHelper } from "../helpers";

class tradingRepository {
  STATIC_URL = "/migoNoticeArticle";

  /**
   * 목록조회
   * @param params
   * @returns {Promise<*>}
   */
  getArticles(params) {
    let url = new URL(constants.API_BASE_URL + this.STATIC_URL);
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }

  /**
   * 상세조회
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getTrading(params) {
    let url = new URL(constants.API_BASE_URL + this.STATIC_URL);
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }
}

export default new tradingRepository();
