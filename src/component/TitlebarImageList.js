import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
//import itemData from "./itemData";
//import image from "path/to/image.jpg";

const itemData = [
  {
    img: "./abc.PNG",
    title: "Image",
    author: "SDFDSSD",
    cols: 1,
  },
  {
    img: "./abc.PNG",
    title: "Image",
    author: "111111",
    cols: 2,
  },
  {
    img: "./abc.PNG",
    title: "Image",
    author: "3333333333r",
    cols: 1,
  },
  {
    img: "./abc.PNG",
    title: "Image",
    author: "author",
    cols: 3,
  },
  {
    img: "./abc.PNG",
    title: "Image",
    author: "author",
    cols: 2,
  },
  {
    img: "./abc.PNG",
    title: "Image",
    author: "author",
    cols: 2,
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 1000,
    height: 450,
  },
}));

export default function TitlebarImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={160} className={classes.imageList} cols={3}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1}>
            <img src={item.img} alt={item.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
