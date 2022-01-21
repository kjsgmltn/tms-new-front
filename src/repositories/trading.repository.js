import { constants } from "../commons";
import { apiHelper } from "../helpers";

class tradingRepository {
  STATIC_URL = "/migoNoticeArticle";

  /**
   * 종합 매매현황
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getPay(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getBuyTradingData");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }
}

export default new tradingRepository();
