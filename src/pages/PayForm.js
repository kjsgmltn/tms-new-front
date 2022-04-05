import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";

import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import { bnsRepository } from "../repositories";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 200,
  },
}));

export default function BoardNew({ changeInput }) {
  const classes = useStyles();
  const [replyArticle, setReplyArticle] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;

    setReplyArticle({
      ...replyArticle,
      [name]: event.target.value,
    });
  };
  const handleChange_2 = (e) => {
    const name = e.target.name;

    setReplyArticle({
      ...replyArticle,
      [name]: e.target.value,
    });
  };

  //저장하기
  const saveProfit = () => {
    bnsRepository
      .saveProfit({
        ...replyArticle,
      })
      .then(() => {});
  };
  //저장버튼 눌렀을때
  const saveBtnClick = (e) => {
    console.log(replyArticle);
    saveProfit();
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const selectedView = "month"; // default view  week month
  return (
    <div>
      <form onSubmit={handleSubmit(saveBtnClick)}>
        <div>
          코드 종류 :{" "}
          <FormControl className={classes.formControl}>
            <NativeSelect
              value={replyArticle.d_code}
              onChange={handleChange}
              name="d_code"
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "d_code" }}
            >
              <option value="">선택해주세요</option>
              <option value="k-stock">k-stock</option>
              <option value="bit-coin">bit-coin</option>
              <option value="game">game</option>
            </NativeSelect>
          </FormControl>
        </div>
        <div>
          실현금액 :{" "}
          <FormControl className={classes.formControl}>
            <TextField
              value={replyArticle.final_price}
              onChange={handleChange_2}
              name="final_price"
            />
            {errors.final_price &&
              errors.final_price.type == "required" &&
              "내용을 입력해주세요 "}
          </FormControl>
        </div>

        <div>
          수익 손실 구분 :{" "}
          <FormControl className={classes.formControl}>
            <NativeSelect
              value={replyArticle.iv_name}
              onChange={handleChange}
              name="iv_name"
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "iv_name" }}
            >
              <option value="">선택해주세요</option>
              <option value={10}>수익</option>
              <option value={20}>손실</option>
            </NativeSelect>
          </FormControl>
        </div>
        <input type="hidden" name="boardId" onChange={changeInput} />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
