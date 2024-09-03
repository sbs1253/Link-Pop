import { useformatTimestamp } from '@hooks/useformatTimestamp';
import { useUserQuery } from '@services/reactQuery/useUserQuery';
import { CommentType } from 'src/store/types';
import styled from 'styled-components';
const Comment = ({ userId, comment, createdAt }: CommentType) => {
  const { data } = useUserQuery(userId);
  if (!data) return null;

  return (
    <CommentContainer>
      <img src={data.img} alt="profile" />
      <div className="comment__info">
        <div className="comment__title">
          <span>{data.username}</span>
          <span>{useformatTimestamp(createdAt)}</span>
        </div>
        <h3 className="comment__text">{comment}</h3>
      </div>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
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
`;
