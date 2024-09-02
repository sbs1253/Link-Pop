import styled from 'styled-components';
import {
  CommentOutlined,
  FavoriteBorderOutlined,
  ThumbUpAltOutlined,
  MoreVertOutlined,
  ThumbDownOutlined,
} from '@mui/icons-material';
import { PlaylistType, UserType } from '@store/types';

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
const DetailCard = ({ playlist, user }) => {
  return (
    <DetailCardContainer>
      <img src={playlist.creator.img} alt="profile" />
      <div className="playlist__info">
        <div>
          <h4>{playlist.title}</h4>
          <p>{formatTimestamp(playlist.createdAt)}</p>
        </div>
        <ul>
          <li>
            <FavoriteBorderOutlined
              sx={user.subscribedPlaylists?.[playlist.id] ? { color: '#D33F40' } : null}
            ></FavoriteBorderOutlined>
          </li>
          <li>
            <ThumbUpAltOutlined
              sx={user.likedPlaylists?.[playlist.id] ? { color: '#D33F40' } : null}
            ></ThumbUpAltOutlined>
            <span>{playlist.likes}</span>
          </li>
          <li>
            <ThumbDownOutlined
              sx={user.dislikedPlaylists?.[playlist.id] ? { color: '#D33F40' } : null}
            ></ThumbDownOutlined>
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
    </DetailCardContainer>
  );
};

export default DetailCard;

const DetailCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
