import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PlayList from '@components/PlayList';
import Tracks from '@pages/PlaylistDetail/components/Tracks';
import Comment from '@pages/PlaylistDetail/components/Comment';

import PlaylistForm from '@pages/PlaylistDetail/components/TrackAddForm';
import { ControlPoint } from '@mui/icons-material';
import { useToggle } from '@hooks/useToggle';
import { usePlaylistDetailsQuery } from '@services/reactQuery/usePlaylistsQuery';
import LoadingCircular from '@components/LoadingCircular';

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist, isLoading, isFetching } = usePlaylistDetailsQuery(id as string);
  const [open, setOpen] = useToggle();
  if (!id) {
    return <h1 color="red">Error: No playlist ID provided</h1>;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!playlist) return <h1 color="red">Error: No playlist ID provided</h1>;
  return (
    <PlaylistDetailContainer>
      {isFetching && <LoadingCircular />}
      <PlayList playlistId={playlist.id} />
      <PlaylistDetailList>
        <h3 className="detail__track">
          <span>Tracks</span>{' '}
          <ControlPoint
            className="listAdd"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          ></ControlPoint>
        </h3>
        {playlist.tracks
          ? Object.entries(playlist.tracks)?.map(([id, track], index) => (
              <Tracks
                key={id}
                trackId={id}
                playlistId={playlist.id}
                title={track.title}
                url={track.url}
                index={index}
              ></Tracks>
            ))
          : null}
      </PlaylistDetailList>
      <PlaylistDetailComment>
        <h3>Comment</h3>
        {playlist.comments
          ? playlist.comments?.map((playlist, index) => (
              <Comment
                key={index}
                userId={playlist.userId}
                comment={playlist.comment}
                createdAt={playlist.createdAt}
              ></Comment>
            ))
          : null}
      </PlaylistDetailComment>
      {open && (
        <PlaylistForm playlistId={playlist.id} setOpen={setOpen as React.Dispatch<React.SetStateAction<boolean>>} />
      )}
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
  padding-bottom: 200px;
  overflow-y: scroll;
  & .detail__track {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
  }
  & .listAdd {
    cursor: pointer;
    transition: color 0.15s;
    &:hover {
      color: ${(props) => props.theme.colors.primary.normal};
    }
  }
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
