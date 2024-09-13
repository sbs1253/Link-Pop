import { useState } from 'react';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { useUserStore } from '@store/useUserStore';
import { useCommentAddQuery } from '@hooks/query/useCommentAddQuery';

const CommentComponent = ({ playlistId }: { playlistId: string }) => {
  const [comment, setComment] = useState('');
  const user = useUserStore((state) => state.user);
  const { mutate: commentAddMutate } = useCommentAddQuery();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
      userId: user.id,
      comment,
      createdAt: Date.now(),
    };
    commentAddMutate({ playlistId, comment: newComment });
    setComment('');
  };

  return (
    <CommentContainer>
      <form className="comment__form" onSubmit={handleSubmit}>
        <img className="comment__avatar" src={user.img} alt="User Avatar" />
        <input
          className="comment__input"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="내용을 입력해주세요"
        />

        <button className="comment__btn" type="submit">
          <SendIcon sx={{ fontSize: 20 }} />
        </button>
      </form>
    </CommentContainer>
  );
};

export default CommentComponent;

const CommentContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background[2]};
  padding: 16px;
  border-radius: 8px;

  & .comment__form {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  & .comment__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  & .comment__input {
    flex-grow: 1;
    background-color: ${(props) => props.theme.colors.background[3]};
    color: ${(props) => props.theme.colors.text.body};
    border: 1px solid ${(props) => props.theme.colors.stroke[1]};
    border-radius: 20px;
    padding: 10px 20px;
    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.primary.normal};
    }
    &::placeholder {
      color: ${(props) => props.theme.colors.text.bodySubtle};
    }
  }

  & .comment__icon {
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.text.bodySubtle};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: ${(props) => props.theme.colors.text.body};
    }
  }

  & .comment__btn {
    background-color: ${(props) => props.theme.colors.primary.normal};
    color: ${(props) => props.theme.colors.text.title};
    border: none;
    border-radius: 10px;
    padding: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: ${(props) => props.theme.colors.primary.hover};
    }
    &:active {
      background-color: ${(props) => props.theme.colors.primary.active};
    }
  }
`;
