import { constants } from "../commons";
import { apiHelper } from "../helpers";
import { useQuery } from "react-query";
class bnsRepository {
  STATIC_URL = "/migoNoticeArticle";

  /**
   * 수입/손실
   * @param id
   * @param params
   * @returns {Promise<*>}
   */
  getPay(params) {
    let url = new URL(constants.API_BASE_URL + "/bns/getBnsRowData");
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
    let url = new URL(constants.API_BASE_URL + "/bns/getBnsRank");
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
    let url = new URL(constants.API_BASE_URL + "/bns/getBnsGroupDay");
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
    let url = new URL(constants.API_BASE_URL + "/bns/getBnsGroupWeek");
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
    let url = new URL(constants.API_BASE_URL + "/bns/getBnsGroupMonth");
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
    let url = new URL(constants.API_BASE_URL + "/bns/getBnsGroupYear");
    url.search = new URLSearchParams(params).toString();
    return apiHelper.request({ url, method: "GET" });
  }
}

export default new bnsRepository();
