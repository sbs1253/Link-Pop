import Category from '@pages/Home/components/Category';
import PlayList from '@components/PlayList';
import styled from 'styled-components';
import { usePlaylist } from '@hooks/usePlaylists';

const Home = () => {
  const { data } = usePlaylist();

  return (
    <HomeContainer>
      <Category />
      {data?.map((playlist) => (
        <PlayList key={playlist.id} playlist={playlist} />
      ))}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
