import Category from '@pages/Home/components/Category';
import PlayList from '@components/PlayList';
import styled from 'styled-components';
import { useState } from 'react';
import useCategory from '@hooks/useCategory';
import LoadingCircular from '@components/LoadingCircular';
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data, isLoading, error } = useCategory(selectedCategory);
  if (isLoading) return <LoadingCircular />;
  if (error) return <div>Error loading playlists</div>;
  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <HomeContainer>
      <Category handleCategory={handleCategory} />
      {data?.map((playlistId) => (
        <PlayList key={playlistId} playlistId={playlistId} />
      ))}
      {data?.map((playlistId) => (
        <PlayList key={playlistId} playlistId={playlistId} />
      ))}
      {data?.map((playlistId) => (
        <PlayList key={playlistId} playlistId={playlistId} />
      ))}
      {data?.map((playlistId) => (
        <PlayList key={playlistId} playlistId={playlistId} />
      ))}
      {data?.map((playlistId) => (
        <PlayList key={playlistId} playlistId={playlistId} />
      ))}
      {data?.map((playlistId) => (
        <PlayList key={playlistId} playlistId={playlistId} />
      ))}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding-bottom: 200px;
  overflow-y: scroll;
`;
