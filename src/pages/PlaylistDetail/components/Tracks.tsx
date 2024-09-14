import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDeleteTrackQuery } from '@hooks/query/useDeleteTrackQuery';
import DeleteButton from '@pages/PlaylistDetail/components/DeleteButton';
import LoadingCircular from '@components/LoadingCircular';

const Tracks = ({
  playlistId,
  trackId,
  title,
  url,
  index,
}: {
  title?: string;
  url?: string;
  trackId: string;
  playlistId: string;
  index: number;
}) => {
  const { mutate: trackDeleteMutate, isPending } = useDeleteTrackQuery();
  const deleteTrack = () => {
    trackDeleteMutate({ playlistId, trackId });
  };
  return (
    <TracksContainer>
      {isPending && <LoadingCircular />}
      <input type="checkbox" id={trackId} className="track__checkbox" />
      <h4>Tracks: {index + 1}</h4>
      <a target="_blank" href={url} className="track__title">
        {title}
      </a>
      <label htmlFor={trackId} className="track__more-button">
        <ExpandMoreIcon />
      </label>

      <DeleteButton onClick={deleteTrack} />
    </TracksContainer>
  );
};

export default Tracks;

const TracksContainer = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  min-height: 50px;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.background[3]};
  transition: all 0.3s;

  & h4 {
    white-space: nowrap;
  }
  & .track__title {
    flex: 1;
    max-width: 300px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-decoration: none;
    color: ${(props) => props.theme.colors.text.title};
    transition: all 0.35s;

    &:hover {
      color: ${(props) => props.theme.colors.primary.normal};
    }
  }

  & .track__checkbox {
    display: none;
    &:checked ~ .track__more-button {
      transform: rotate(180deg);
    }
    &:checked ~ .track__title {
      -webkit-line-clamp: unset;
    }
  }

  & .track__more-button {
    cursor: pointer;
    color: ${(props) => props.theme.colors.text.caption};
    transition: all 0.3s;
    &:hover {
      color: ${(props) => props.theme.colors.primary.normal};
    }
  }
`;
