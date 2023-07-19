import { useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDetailedItem } from "../../../../../data";

export const DetailedItem = observer(() => {
  const itemId = useLocation().pathname.split("/")[2];

  const {
    comment,
    handleAddComment,
    handleCommentChange,
    item,
    like,
    likeCount,
    handleLike,
  } = useDetailedItem(itemId);

  return (
    <Card
      elevation={20}
      sx={{
        width: "100%",
        minWidth: 1220,
        p: 5,
        backgroundColor: "transparent",
        height: 700,
        overflowY: "auto",
      }}
    >
      <div className={"flex flex-row w-full justify-around items-center"}>
        <CardMedia
          component={"img"}
          image={item.image}
          alt={item.title}
          className={"max-w-[200px] max-h-52 rounded"}
        />
        <Typography variant={"h4"} color={"text"}>
          {item.title}
        </Typography>
      </div>
      <CardContent>
        <div className={"flex flex-col gap-5"}>
          <div className={"flex flex-row gap-5 items-center"}>
            Tags:
            {item.tags
              ? item.tags.map((tag, idx) => (
                  <Chip key={idx} label={tag} variant="filled" />
                ))
              : "No tags"}
          </div>
          <div className={"flex flex-row gap-5 items-center"}>
            <IconButton onClick={() => handleLike(itemId, like)}>
              {like ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <span className={"text-base font-semibold"}>{likeCount}</span>
          </div>
        </div>
      </CardContent>
      <CardContent className={"flex flex-col gap-10"}>
        <div className={"w-full flex justify-self-auto"}>
          <div className={"max-w-5xl "}>
            Comments:
            {item.comments && item.comments.length > 0 ? (
              item.comments.map(comment => (
                <div
                  key={comment._id}
                  className={" flex flex-row justify-between"}
                >
                  <Typography>{comment.content}</Typography>
                </div>
              ))
            ) : (
              <Typography>No comments</Typography>
            )}
          </div>
        </div>
        <div>
          <TextareaAutosize
            minRows={3}
            value={comment}
            onChange={handleCommentChange}
            className={"bg-transparent border p-2 w-full rounded"}
          />
          <Button
            variant="outlined"
            color={"inherit"}
            sx={{ mt: 2 }}
            onClick={handleAddComment}
          >
            Add comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
