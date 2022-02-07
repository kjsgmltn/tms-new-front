import React, { useEffect, useState } from "react";
import { tradingRepository } from "../repositories";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LossTab from "../containers/LossTab";

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

export default function BoardNew({
  changeInput,
  inputData,
  onSaveButtonClick,
  resetForm,
}) {
  const classes = useStyles();

  const saveBtnClick = (e) => {
    onSaveButtonClick(inputData);
    resetForm();
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(saveBtnClick)}>
        <div>
          코드 종류 :{" "}
          <input
            type="text"
            {...register("boardTitle", { required: true })}
            onChange={changeInput}
          />
          {errors.boardTitle && "제목을 입력해주세요"}
        </div>
        <div>
          실현금액 :{" "}
          <input
            type="text"
            name="boardContent"
            {...register("boardContent", { required: true, minLength: 5 })}
            onChange={changeInput}
          />
          {(errors.boardContent &&
            errors.boardContent.type == "required" &&
            "내용을 입력해주세요") ||
            "최소 5글자 입력해주세요"}
        </div>
        <div>
          실현 기준일 :{" "}
          <input
            type="text"
            name="boardContent"
            {...register("boardContent", { required: true, minLength: 5 })}
            onChange={changeInput}
          />
          {(errors.boardContent &&
            errors.boardContent.type == "required" &&
            "내용을 입력해주세요") ||
            "최소 5글자 입력해주세요"}
        </div>
        <div>
          수익 손실 구분 :{" "}
          <input
            type="text"
            name="boardContent"
            {...register("boardContent", { required: true, minLength: 5 })}
            onChange={changeInput}
          />
          {(errors.boardContent &&
            errors.boardContent.type == "required" &&
            "내용을 입력해주세요") ||
            "최소 5글자 입력해주세요"}
        </div>
        <input type="hidden" name="boardId" onChange={changeInput} />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
