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
}

export default new tradingRepository();
