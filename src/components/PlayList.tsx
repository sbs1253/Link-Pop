import styled from 'styled-components';
import {
  CommentOutlined,
  FavoriteBorderOutlined,
  ThumbUpAltOutlined,
  MoreVertOutlined,
  ThumbDownOutlined,
} from '@mui/icons-material';
import { PlaylistType, UserType } from '@store/types';
import { useSubscribe } from '@hooks/useSubscribed';
import { useLike } from '@hooks/useLike';

const PlayList = ({ playlist, user }: { playlist: PlaylistType; user: UserType }) => {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  const { mutate } = useSubscribe();
  const { mutate: likeMutate } = useLike();
  const handleSubscription = () => {
    mutate({ userId: user.id, playlistId: playlist.id, subscribed: user.subscribedPlaylists[playlist.id] });
  };
  const handleLike = () => {
    likeMutate({ userId: user.id, playlistId: playlist.id, likedPlaylists: user.likedPlaylists[playlist.id] });
  };
  return (
    <PlayListContainer>
      <img src={playlist.creator.img} alt="profile" />
      <div className="playlist__info">
        <div>
          <h4>{playlist.title}</h4>
          <p>{formatTimestamp(playlist.createdAt)}</p>
        </div>
        <ul>
          <li onClick={handleSubscription}>
            <FavoriteBorderOutlined
              sx={user.subscribedPlaylists[playlist.id] ? { color: '#D33F40' } : null}
            ></FavoriteBorderOutlined>
          </li>
          <li onClick={handleLike}>
            <ThumbUpAltOutlined></ThumbUpAltOutlined>
            <span>{playlist.likes}</span>
          </li>
          <li>
            <ThumbDownOutlined></ThumbDownOutlined>
            <span>{playlist.dislikes}</span>
          </li>
          <li>
            <CommentOutlined></CommentOutlined>
            <span>{playlist.comments?.length || 0}</span>
          </li>
        </ul>
        <p className="playlist__creator">작성자 : {playlist.creator.username}</p>
        <MoreVertOutlined className="playlist__more"></MoreVertOutlined>
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
      font-size: var(--font-size-caption);
      line-height: var(--line-height-caption);
      font-size: var(--font-size-caption);
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
        & > * {
          font-size: var(--font-size-body-small);
          line-height: var(--line-height-body-small);
          font-weight: var(--font-weight-body-small);
        }
      }
    }
    & .playlist__creator {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
    & .playlist__more {
      position: absolute;
      top: 10px;
      right: 10px;
      transition: color 0.3s;
      &:hover {
        color: ${(props) => props.theme.colors.primary.normal};
      }
    }
  }
`;
