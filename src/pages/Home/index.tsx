import Category from '@pages/Home/components/Category';
import PlayList from '@components/PlayList';
import styled from 'styled-components';
import { usePlaylists } from '@hooks/usePlaylists';
import { useStore } from '@store/useStore';

const Home = () => {
  const { user, setUser } = useStore();
  const { data, isLoading, error } = usePlaylists();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading playlists</div>;

  return (
    <HomeContainer>
      <Category />
      {user && data?.map((playlist) => <PlayList key={playlist.id} playlist={playlist} user={user} />)}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
