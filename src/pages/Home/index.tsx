import Category from '@pages/Home/components/Category';
import PlayList from '@components/PlayList';
import styled from 'styled-components';
import { useState } from 'react';
import useCategory from '@hooks/useCategory';
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data, isLoading, error, user } = useCategory(selectedCategory);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading playlists</div>;
  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };
  // console.log(data, userdata);
  return (
    <HomeContainer>
      <Category handleCategory={handleCategory} />
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
