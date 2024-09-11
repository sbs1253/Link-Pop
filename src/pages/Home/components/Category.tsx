import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = (category: string) => setSearchParams({ category });
  const category = [
    {
      onclick: () => handleClick('all'),
      className: searchParams.get('category') === 'all' ? 'active' : '',
      text: 'All',
    },
    {
      onclick: () => handleClick('subscribe'),
      className: searchParams.get('category') === 'subscribe' ? 'active' : '',
      text: 'Subscribe',
    },
    {
      onclick: () => handleClick('myPlaylist'),
      className: searchParams.get('category') === 'myPlaylist' ? 'active' : '',
      text: 'MyPlaylist',
    },
  ];

  return (
    <CategoryContainer>
      <ul>
        {category.map((item, index) => (
          <li key={index} onClick={item.onclick} className={item.className}>
            {item.text}
          </li>
        ))}
      </ul>
    </CategoryContainer>
  );
};

export default Category;

const CategoryContainer = styled.nav`
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
      &.active {
        color: ${({ theme }) => theme.colors.primary.normal};
        border-bottom: 2px solid ${({ theme }) => theme.colors.primary.normal};
      }
    }
  }
`;
