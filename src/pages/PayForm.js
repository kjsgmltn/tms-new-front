import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
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
    //textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 200,
  },
}));

export default function BoardNew({ changeInput }) {
  const classes = useStyles();
  const [replyArticle, setReplyArticle] = useState({});

  // const [state, setState] = React.useState({
  //   age: "",
  //   name: "hai",
  // });

  //객체 셋팅
  // const handleChange = async (event) => {
  //   let name = event.target.name;
  //   let value = event.target.value;

  //   setReplyArticle((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });
  // };

  const handleChange = (event) => {
    const name = event.target.name;
    setReplyArticle({
      ...replyArticle,
      [name]: event.target.value,
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
              <option value="">None</option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
        </div>
        <div>
          실현금액 :{" "}
          <TextField
            name="final_price"
            onChange={handleChange}
            {...register("final_price", { required: true })}
          />
          {errors.final_price &&
            errors.final_price.type == "required" &&
            "내용을 입력해주세요 "}
        </div>
        {/* <div>
          실현 기준일 :{" "}
          <input
            type="datetime-local"
            name="final_date"
            {...register("final_date", { required: true })}
            onChange={handleChange}
          />
          {errors.final_date &&
            errors.final_date.type == "required" &&
            "내용을 입력해주세요"}
        </div> */}
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
              <option value="">None</option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
        </div>
        <input type="hidden" name="boardId" onChange={changeInput} />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
