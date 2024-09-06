import styled from 'styled-components';
const Category = ({ handleCategory }: { handleCategory: (category: string) => void }) => {
  return (
    <CategoryContainer>
      <ul>
        <li onClick={() => handleCategory('All')}>All</li>
        <li onClick={() => handleCategory('Subscribe')}>Subscribe</li>
        <li onClick={() => handleCategory('MyPlaylist')}>MyPlaylist</li>
      </ul>
    </CategoryContainer>
  );
};

export default Category;

const CategoryContainer = styled.div`
  width: 100%;
  min-height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background[3]};
  & ul {
    display: flex;
    justify-content: start;
    width: 100%;
    height: 100%;
    padding: 0;
    & li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      font-size: var(--font-size-body-regular);
      line-height: var(--line-height-body-regular);
      font-weight: var(--font-weight-body-regular);
      cursor: pointer;
      transition: color 0.3s;
      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.primary.normal};
        border-bottom: 2px solid ${({ theme }) => theme.colors.primary.normal};
      }
    }
  }
`;
