import { constants } from "../commons";
import { apiHelper } from "../helpers";

class tradingRepository {
  STATIC_URL = "/migoNoticeArticle";

  /**
   * 매수
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getBuyTradingData(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getBuyTradingData");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }

  /**
   * 매도
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getSellTradingData(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getSellTradingData");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }

  /**
   * 트레이딩 현황
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getTradingDashData(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getTradingDashData");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }

  /**
   * 자산배분 조회
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getAssets(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getAssets");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }
}

export default new tradingRepository();
