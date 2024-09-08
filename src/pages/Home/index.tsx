import Category from '@pages/Home/components/Category';
import PlayList from '@components/PlayList';
import styled from 'styled-components';
import { useState } from 'react';
import useCategory from '@hooks/useCategory';
import LoadingCircular from '@components/LoadingCircular';
import { useUserStore } from '@store/useUserStore';
import NotFound from '@pages/NotFound';
const Home = () => {
  console.log(useUserStore((state) => state.user));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data, isLoading, isError, error } = useCategory(selectedCategory);
  if (isLoading) return <LoadingCircular />;
  if (isError) return <NotFound messege={error?.message || 'Not Found'} />;

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <HomeContainer>
      <Category handleCategory={handleCategory} />
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
