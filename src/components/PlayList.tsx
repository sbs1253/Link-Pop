import styled from 'styled-components';
import { CommentOutlined, FavoriteBorderOutlined, ThumbUpAltOutlined, MoreVertOutlined } from '@mui/icons-material';
import { useState } from 'react';

const PlayList = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(0);
  return (
    <PlayListContainer>
      <img src="assets/profile.jpg" alt="profile" />
      <div className="playlist__info">
        <div>
          <h4>현재 플레이 리스트의 설명</h4>
          <p>2024-08-27</p>
        </div>
        <ul>
          <li onClick={() => setSubscribed((state) => !state)}>
            <FavoriteBorderOutlined sx={subscribed ? { color: '#D33F40' } : null}></FavoriteBorderOutlined>
          </li>
          <li
            onClick={() =>
              setLiked((state) => {
                if (!state) {
                  setLike((prev) => prev + 1);
                } else {
                  setLike((prev) => prev - 1);
                }
                return !state;
              })
            }
          >
            <ThumbUpAltOutlined sx={liked ? { color: '#D33F40' } : null}></ThumbUpAltOutlined>
            <span>{like}</span>
          </li>
          <li>
            <CommentOutlined></CommentOutlined>
            <span>{commented}</span>
          </li>
        </ul>
        <MoreVertOutlined className="more"></MoreVertOutlined>
      </div>
    </PlayListContainer>
  );
};

export default PlayList;

const PlayListContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.background[3]};
  }
  & img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  & .playlist__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    gap: 10px;
    width: 100%;
    & h3 {
      font-size: var(--font-size-h3);
      line-height: var(--line-height-h3);
      font-weight: var(--font-weight-h3);
    }
    & p {
      color: ${(props) => props.theme.colors.text.bodySubtle};
      font-size: var(--font-size-body-small);
      line-height: var(--line-height-body-small);
      font-weight: var(--font-weight-body-small);
    }
    & ul {
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${(props) => props.theme.colors.text.bodySubtle};
      & li {
        display: flex;
        align-items: center;
        gap: 5px;
        transition: color 0.3s;

        &:hover {
          color: ${(props) => props.theme.colors.primary.normal};
        }
        & span {
          font-size: var(--font-size-body-small);
          line-height: var(--line-height-body-small);
          font-weight: var(--font-weight-body-small);
        }
      }
    }
  }
  .more {
    position: absolute;
    top: 10px;
    right: 10px;
    transition: color 0.3s;
    &:hover {
      color: ${(props) => props.theme.colors.primary.normal};
    }
  }
`;
