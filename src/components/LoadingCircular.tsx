import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from 'styled-components';

export default function LoadingCircular() {
  return (
    <LoadingCircularContainer>
      <CircularProgress className="loading__circular" />
    </LoadingCircularContainer>
  );
}

const LoadingCircularContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;

  & .loading__circular {
    color: ${(props) => props.theme.colors.primary.normal};
  }
`;
