/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  IoMdArrowDropup as ArrowUp,
  IoMdArrowDropdown as ArrowDown,
} from "react-icons/io";
import Pagination from "./Pagination";
import Detail from "../pages/main/detail";
const tableHeadTr = css`
  height: 50px;
  background-color: #dddddd;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  vertical-align: middle;
`;

const tableHeadTh = css`
  cursor: pointer;
  &:hover {
    color: #888888;
  }
`;

const tbodyTr = css`
  text-align: center;
  height: 50px;
  border-bottom: 1px solid #dddddd;
  cursor: pointer;
  font-size: 14px;
  background-color: #ffffff;
  color: #000000;
  &:hover {
    background-color: #eeeeee;
  }
`;

const tbodyDetail = css`
  border-bottom: none;
`;

const pageWrap = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  position: relative;
`;

const container = css`
  height: auto;
  padding: 10px 50px;
  display: flex;
`;

const wrap = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 500px;
`;

const title = css`
  display: flex;
  font-weight: bold;
  margin-bottom: 10px;
`;

const sub = css`
  color: #333333;
  display: flex;

  & + & {
    margin-top: 5px;
  }
`;
export default function Table({
  data = [],
  detailNo,
  header,
  page,
  setPage,
  align,
  orderBy,
  totalCount,
  handleDetail,
  handleAlign,
}) {
  return (
    <>
      {/* 테이블 */}
      <table css={{ width: "100%" }}>
        <thead>
          <tr css={tableHeadTr}>
            {header.map((d) => (
              <th
                css={d.key !== "iv_name" && tableHeadTh}
                key={d.idx}
                onClick={() => handleAlign(d.key)}
              >
                {d.value}
                {align === d.key &&
                  (orderBy === true ? <ArrowDown /> : <ArrowUp />)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr css={tbodyTr}>
              <td colSpan={header.length}>데이터가 없습니다.</td>
            </tr>
          ) : (
            data.map((row, i) => (
              <>
                <tr
                  key={row.idx}
                  css={[tbodyTr, detailNo === row.idx && tbodyDetail]}
                  // onClick={() =>
                  //   handleDetail(detailNo === row.idx ? null : row.idx)
                  // }
                >
                  {header.map((h) => (
                    <td key={h.idx} width={h.width}>
                      {row[h.key]}
                    </td>
                  ))}
                </tr>
                {/* {detailNo === row.idx && (
                  <tr css={tbodyTr}>
                    <td colSpan={header.length}>
                      <Detail idx={row.idx} />
                    </td>
                  </tr>
                )} */}
              </>
            ))
          )}
        </tbody>
      </table>

      {/* 페이징 */}
      <div css={pageWrap}>
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          pageSize={10}
          totalCount={totalCount}
        />
      </div>
    </>
  );
}
