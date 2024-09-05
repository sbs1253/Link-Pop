import styled from 'styled-components';
import { TrackType } from '@store/types';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import DeleteButton from '@pages/PlaylistDetail/components/DeleteButton';
import { useDeleteQuery } from '@services/reactQuery/useDeleteQuery';
import LoadingCircular from '@components/LoadingCircular';

const Tracks = ({
  playlistId,
  trackId,
  title,
  url,
  index,
}: TrackType & { trackId: string; playlistId: string; index: number }) => {
  const { mutate, isPending } = useDeleteQuery();
  const deleteTrack = () => {
    mutate({ playlistId, trackId });
  };
  return (
    <TracksContainer>
      {isPending && <LoadingCircular />}
      <h4>Tracks: {index + 1}</h4>
      <a href={url}>
        <PlayCircleFilledWhiteOutlinedIcon />
        {title}
      </a>
      <DeleteButton onClick={deleteTrack} />
    </TracksContainer>
  );
};

export default Tracks;

const TracksContainer = styled.li`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.background[3]};
  transition: all 0.3s;

  & a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${(props) => props.theme.colors.text.title};
    font-size: 20px;
    text-decoration: none;
    transition: all 0.15s;

    &:hover {
      color: ${(props) => props.theme.colors.primary.normal};
    }
  }
`;
