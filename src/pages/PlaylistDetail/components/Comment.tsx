import { CommentType } from 'src/store/types';
const Comment = ({ userId, comment }: CommentType) => {
  console.log(userId, comment);
  return (
    <div>
      <div>
        {userId},{comment}
      </div>
    </div>
  );
};

export default Comment;
