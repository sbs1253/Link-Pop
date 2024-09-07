import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDeleteTrackQuery } from '@services/reactQuery/useDeleteQuery';
import { TrackType } from '@store/types';
import DeleteButton from '@pages/PlaylistDetail/components/DeleteButton';
import LoadingCircular from '@components/LoadingCircular';
const Tracks = ({
  playlistId,
  trackId,
  title,
  url,
  index,
}: TrackType & { trackId: string; playlistId: string; index: number }) => {
  const [more, setMore] = useState(false);
  const titleRef = useRef(null);
  const [moreButton, setMoreButton] = useState(false);
  const { mutate, isPending } = useDeleteTrackQuery();
  const deleteTrack = () => {
    mutate({ playlistId, trackId });
  };

  const checkOverflow = () => {
    if (titleRef.current) {
      const { scrollWidth, clientWidth } = titleRef.current;
      setMoreButton(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    const handleResize = () => {
      checkOverflow();
    };
    window.addEventListener('resize', handleResize); // resize 이벤트 리스너 추가
    return () => {
      window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  return (
    <TracksContainer>
      {isPending && <LoadingCircular />}
      <h4>Tracks: {index + 1}</h4>
      <a ref={titleRef} href={url} className={`track__title ${more ? 'more' : ''}`}>
        {title}
      </a>
      {moreButton && (
        <span className="track__more" onClick={() => setMore((prev) => !prev)}>
          <ExpandMoreIcon />
        </span>
      )}

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
  & a {
    display: inline-block;
    max-width: 70%;
    color: ${(props) => props.theme.colors.text.title};
    font-size: 20px;
    text-decoration: none;
    transition: all 0.35s;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &.more {
      white-space: normal;
      overflow-wrap: break-word;
    }
    &:hover {
      color: ${(props) => props.theme.colors.primary.normal};
    }
  }
  & .track__more {
    cursor: pointer;
    color: ${(props) => props.theme.colors.text.caption};
    transition: all 0.3s;
    &:hover {
      color: ${(props) => props.theme.colors.primary.normal};
    }
  }
`;
