import styled from 'styled-components';
import { TrackType } from '@store/types';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
const Tracks = ({ title, url, index }: TrackType & { index: number }) => {
  return (
    <TracksContainer>
      <h3>Tracks{index}</h3>
      <a href={url}>
        <PlayCircleFilledWhiteOutlinedIcon />
        {title}
      </a>
    </TracksContainer>
  );
};

export default Tracks;

const TracksContainer = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.background[3]};

  & a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-size: 20px;
    text-decoration: none;
  }
`;
