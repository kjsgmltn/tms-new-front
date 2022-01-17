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
   * 수입/손실
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getPay(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getBnsRowData");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }

  /**
   * 랭킹
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getRank(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getBnsRank");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }

  /**
   * 일별매출
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getBnsGroupDay(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getBnsGroupDay");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }

  /**
   * 주간매출
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getBnsGroupWeek(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getBnsGroupWeek");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }

  /**
   * 월간매출
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getBnsGroupMonth(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getBnsGroupMonth");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }
  /**
   * 년간매출
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getBnsGroupYear(params) {
    let url = new URL(constants.API_BASE_URL + "/trading/getBnsGroupYear");
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
    let url = new URL(constants.API_BASE_URL + "/car/specification");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }
}

export default new tradingRepository();
