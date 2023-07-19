import { ButtonGroup, IconButton } from "@mui/material";
import { Check, Delete, Edit } from "@mui/icons-material";

export const CommentActions = ({
  commentId,
  isEdit,
  handleEdit,
  handleRemoveComment,
  selectComment,
}: {
  commentId: string;
  isEdit: boolean;
  handleEdit: () => void;
  handleRemoveComment: (commentId: string) => void;
  selectComment: (commentId: string) => void;
}) => {
  const handleDelete = () => {
    handleRemoveComment(commentId);
  };

  const handleUpdate = () => {
    handleEdit();
    selectComment(commentId);
  };

  return (
    <ButtonGroup>
      <IconButton onClick={handleUpdate}>
        {isEdit ? <Check /> : <Edit />}
      </IconButton>
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
    </ButtonGroup>
  );
};
