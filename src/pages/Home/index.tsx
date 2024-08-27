import Category from '@pages/Home/components/Category';
import PlayList from '@components/PlayList';
import styled from 'styled-components';
const Home = () => {
  return (
    <HomeContainer>
      <Category />
      <PlayListBox />
      <PlayListBox />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PlayListBox = styled(PlayList)``;
