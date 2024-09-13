import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PlayList from '@components/PlayList';
import Tracks from '@pages/PlaylistDetail/components/Tracks';
import Comment from '@pages/PlaylistDetail/components/Comment';

import PlaylistTrackForm from '@pages/PlaylistDetail/components/TrackAddForm';
import { ControlPoint } from '@mui/icons-material';
import { useToggle } from '@hooks/useToggle';
import { usePlaylistDetailsQuery } from '@hooks/query/usePlaylistsQuery';
import LoadingCircular from '@components/LoadingCircular';
import CommentForm from '@pages/PlaylistDetail/components/CommentForm';
import { CommentType } from '@store/types';
import NotFound from '@pages/NotFound';

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist, isFetching, isError, error } = usePlaylistDetailsQuery(id as string);
  const [open, setOpen] = useToggle();
  if (isError) return <NotFound messege={error.message} />;
  if (!playlist) return <NotFound messege="Playlist not found" />;

  const sortCommentsDate = (comments: CommentType) => {
    return Object.entries(comments).sort(([, a], [, b]) => b.createdAt - a.createdAt);
  };
  return (
    <PlaylistDetailContainer>
      {isFetching && <LoadingCircular />}
      <PlayList playlistId={playlist.id} />
      <PlaylistDetailList>
        <h3 className="detail__track">
          <span>Tracks</span>
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
        <CommentForm playlistId={playlist.id} />
        {playlist.comments
          ? sortCommentsDate(playlist.comments)?.map(([id, comments]) => (
              <Comment
                key={id}
                commentId={id}
                userId={comments.userId}
                comment={comments.comment}
                createdAt={comments.createdAt}
                playlistId={playlist.id}
              ></Comment>
            ))
          : null}
      </PlaylistDetailComment>
      {open && (
        <PlaylistTrackForm
          playlistId={playlist.id}
          setOpen={setOpen as React.Dispatch<React.SetStateAction<boolean>>}
        />
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
  height: calc(100% - 151px);
  padding: 10px 0;
  overflow-y: auto;
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
  padding: 0 10px;
  /* overflow-y: auto; */
`;
