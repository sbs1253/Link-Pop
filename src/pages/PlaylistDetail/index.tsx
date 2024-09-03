import { useParams } from 'react-router-dom';
import { usePlaylistStore } from '@store/usePlaylistStore';
import { useUserStore } from '@store/useUserStore';
import styled from 'styled-components';
import PlayList from '@components/PlayList';
import Tracks from '@pages/PlaylistDetail/components/Tracks';
import Comment from '@pages/PlaylistDetail/components/Comment';

const PlaylistDetail = () => {
  const { id } = useParams();
  const getPlaylist = usePlaylistStore((state) => state.getPlaylist);
  const { user } = useUserStore();
  if (!user) return <h1 color="red">Error: No user found</h1>;
  if (!id) {
    return <h1 color="red">Error: No playlist ID provided</h1>;
  }

  const playlist = getPlaylist(id);

  if (!playlist) return <h1 color="red">Error: No playlist ID provided</h1>;

  return (
    <PlaylistDetailContainer>
      <PlayList playlist={playlist} user={user} />
      <PlaylistDetailList>
        <h3>Tracks</h3>
        {playlist.tracks?.map((playlist, index) => (
          <Tracks key={index} title={playlist.title} url={playlist.url} index={index}></Tracks>
        ))}
      </PlaylistDetailList>
      <PlaylistDetailComment>
        <h3>Comment</h3>
        {playlist.comments?.map((playlist, index) => (
          <Comment
            key={index}
            userId={playlist.userId}
            comment={playlist.comment}
            createdAt={playlist.createdAt}
          ></Comment>
        ))}
        {playlist.comments?.map((playlist, index) => (
          <Comment
            key={index}
            userId={playlist.userId}
            comment={playlist.comment}
            createdAt={playlist.createdAt}
          ></Comment>
        ))}
      </PlaylistDetailComment>
    </PlaylistDetailContainer>
  );
};

export default PlaylistDetail;

const PlaylistDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const PlaylistDetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
`;

const PlaylistDetailComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
`;
