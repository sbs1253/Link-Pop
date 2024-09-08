import { useformatTimestamp } from '@hooks/useformatTimestamp';
import { useUserQuery } from '@services/reactQuery/useUserQuery';
import { CommentType } from 'src/store/types';
import { MoreVertOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import { useToggle } from '@hooks/useToggle';
import { useUserStore } from '@store/useUserStore';
import { useState } from 'react';
import { useCommentUpdateQuery } from '@services/reactQuery/useCommentUpdateQuery';

const Comment = ({
  userId,
  comment,
  createdAt,
  playlistId,
  commentId,
}: CommentType & { playlistId: string; commentId: string }) => {
  const { data } = useUserQuery(userId);
  const [toggle, setToggle] = useToggle();
  const [editMode, setEditMode] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const { mutate } = useCommentUpdateQuery();
  const user = useUserStore((state) => state.user);
  if (!data) return null;
  const handleEditClick = () => {
    setEditMode(true);
    setToggle();
  };
  console.log(playlistId);
  const handleSave = () => {
    const updateComment = { userId, comment: newComment, createdAt: Date.now() };
    mutate({ playlistId, commentId, comment: updateComment });
    setEditMode(false);
  };
  const handleDelete = () => {};
  return (
    <CommentContainer>
      <img src={data.img} alt="profile" />
      <div className="comment__info">
        <div className="comment__title">
          <span>{data.username}</span>
          <span>{useformatTimestamp(createdAt)}</span>
        </div>
        {editMode ? (
          <div className="comment__text-edit">
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <button onClick={handleSave}>저장</button>
          </div>
        ) : (
          <h3 className="comment__text">{comment}</h3>
        )}
      </div>
      {user.id === userId ? (
        <div className="comment__more">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setToggle();
            }}
            className="comment__more-button"
          >
            <MoreVertOutlined className="comment__more-more" />
          </button>
          <div className={`comment__action ${toggle && 'active'}`}>
            <span onClick={handleEditClick}>수정</span>
            <span onClick={handleDelete}>삭제</span>
          </div>
        </div>
      ) : null}
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.background[3]};

  & img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  & .comment__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
  & .comment__title {
    display: flex;
    gap: 20px;
    color: ${(props) => props.theme.colors.text.bodySubtle};
    font-size: var(--font-size-caption);
    line-height: var(--line-height-caption);
    font-size: var(--font-size-caption);
  }
  & .comment__text-edit {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    gap: 10px;
    & textarea {
      padding: 10px;
      border: 1px solid ${(props) => props.theme.colors.stroke[1]};
      border-radius: 5px;
      background-color: ${(props) => props.theme.colors.background[3]};
      color: ${(props) => props.theme.colors.text.body};
    }
    & button {
      height: 30px;
      background-color: ${(props) => props.theme.colors.primary.normal};
      color: ${(props) => props.theme.colors.text.title};
      border: none;
      border-radius: 5px;
      padding: 6px;
      cursor: pointer;
      white-space: nowrap;
    }
  }
  & .comment__more {
    position: absolute;
    top: 10px;
    right: 10px;

    & .comment__more-button {
      background: none;
      border: none;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: ${(props) => props.theme.colors.primary.normal};
      }
    }
    & .comment__action {
      display: none;
      background-color: ${(props) => props.theme.colors.background[3]};
      border-radius: 5px;
      padding: 10px;
      z-index: 1;
      transition: color 0.3s;

      & span {
        white-space: nowrap;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: ${(props) => props.theme.colors.primary.normal};
        }
      }
      &.active {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: absolute;
        top: 30px;
        right: 0;
        color: ${(props) => props.theme.colors.text.body};
      }
    }
  }
`;
