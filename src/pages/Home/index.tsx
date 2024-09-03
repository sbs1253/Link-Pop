import Category from '@pages/Home/components/Category';
import PlayList from '@components/PlayList';
import styled from 'styled-components';
import { usePlaylistsQuery } from '@services/reactQuery/usePlaylistsQuery';
import { useUserStore } from '@store/useUserStore';

const Home = () => {
  const { user } = useUserStore();
  const { data, isLoading, error } = usePlaylistsQuery();
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
