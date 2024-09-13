import styled from 'styled-components';
import {
  CommentOutlined,
  FavoriteBorderOutlined,
  ThumbUpAltOutlined,
  MoreVertOutlined,
  ThumbDownOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePlaylistDetailsQuery } from '@services/reactQuery/usePlaylistsQuery';
import { useDeletePlaylistQuery } from '@hooks/query/useDeleteQuery';
import { useUserStore } from '@store/useUserStore';
import { useToggle } from '@hooks/useToggle';
import LoadingCircular from '@components/LoadingCircular';
import PlaylistForm from '@components/PlaylistForm';
import { useSubscriptionAction } from '@hooks/useSubscriptionAction';
import { useLikeDislikeActions } from '@hooks/useLikeDislikeAction';
import { formatTimestamp } from '@utils/formatTimestamp';

const PlayList = ({ playlistId }: { playlistId: string }) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useToggle();
  const [openModal, setOpenModal] = useToggle();
  const user = useUserStore((state) => state.user);
  const { subscribePlaylist, subscribeError } = useSubscriptionAction(playlistId, user);
  const { handleLike, handleDislike } = useLikeDislikeActions(playlistId, user);
  const { data: playlist, isLoading: playlistIsLoding, error: playlistError } = usePlaylistDetailsQuery(playlistId);
  const { mutate: deletePlaylistMutate, isPending } = useDeletePlaylistQuery();

  if (playlistIsLoding || isPending) return <LoadingCircular />;
  if (playlistError || subscribeError) return <div>Error loading playlist</div>;

  if (!playlist) return null;
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenModal();
    setToggle();
  };
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deletePlaylistMutate(playlistId);
    setToggle();
  };
  const handleClick = () => {
    if (!openModal) {
      navigate(`/playlist/${playlistId}`);
    }
  };
  const navList = [
    {
      onClick: subscribePlaylist,
      icon: (
        <FavoriteBorderOutlined
          sx={user.subscribedPlaylists?.[playlist.id] ? { color: '#D33F40' } : null}
        ></FavoriteBorderOutlined>
      ),
    },
    {
      onClick: handleLike,
      icon: (
        <ThumbUpAltOutlined sx={user.likedPlaylists?.[playlist.id] ? { color: '#D33F40' } : null}></ThumbUpAltOutlined>
      ),
      text: <span>{playlist.likes}</span>,
    },
    {
      onClick: handleDislike,
      icon: (
        <ThumbDownOutlined sx={user.dislikedPlaylists?.[playlist.id] ? { color: '#D33F40' } : null}></ThumbDownOutlined>
      ),
      text: <span>{playlist.dislikes}</span>,
    },
    {
      icon: <CommentOutlined></CommentOutlined>,
      text: <span>{(playlist.comments && Object.keys(playlist.comments).length) || 0}</span>,
    },
  ];

  return (
    <PlayListContainer onClick={handleClick}>
      <img src={playlist.creator.img} alt="profile" />
      <div className="playlist__info">
        <div>
          <h4>{playlist.title}</h4>
          <p>{playlist.description}</p>
          <p>{formatTimestamp(playlist.createdAt)}</p>
        </div>
        <ul>
          {navList.map((nav, index) => (
            <li key={index} onClick={nav.onClick}>
              {nav.icon}
              {nav.text}
            </li>
          ))}
        </ul>
        <p className="playlist__creator">작성자 : {playlist.creator.username}</p>
        {user.createdPlaylists && Object.hasOwn(user.createdPlaylists, playlistId) ? (
          <div className="playlist__more">
            <PlayListMoreBtn
              onClick={(e) => {
                e.stopPropagation();
                setToggle();
              }}
            ></PlayListMoreBtn>
            <div className={`playlist__action ${toggle && 'active'}`}>
              <span onClick={handleEditClick}>수정</span>
              <span onClick={handleDelete}>삭제</span>
            </div>
          </div>
        ) : null}
      </div>
      {openModal && <PlaylistForm setOpen={() => setOpenModal()} isEdit={true} playlist={playlist}></PlaylistForm>}
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
    object-fit: cover;
  }
  & .playlist__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

      & .playlist__action {
        display: none;
        background-color: ${(props) => props.theme.colors.background[3]};
        border-radius: 5px;
        padding: 10px;
        z-index: 1;
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
  }
`;

const PlayListMoreBtn = styled(MoreVertOutlined)`
  &:hover {
    color: ${(props) => props.theme.colors.primary.normal};
  }
`;
