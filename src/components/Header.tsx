import styled from 'styled-components';
import { NotificationsNoneOutlined, Search } from '@mui/icons-material';

const Header = () => {
  return (
    <HeaderContainer>
      <div className="header__logo">
        <img src="assets/logo.png" alt="logo" />
        <span>Studio</span>
      </div>
      <nav className="header__nav">
        <Search></Search>
        <NotificationsNoneOutlined></NotificationsNoneOutlined>
        <img src="assets/profile.jpg" alt="profile" />
      </nav>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.background[3]};
  padding: 10px 20px;

  .header__logo {
    display: flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      font-size: var(--font-size-h2);
      line-height: var(--line-height-h2);
      font-weight: var(--font-weight-h2);
    }
  }
  .header__nav {
    display: flex;
    align-items: center;
    gap: 20px;
    & * {
      cursor: pointer;
    }
    & img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
    }
    & svg {
      transition: color 0.3s;
      &:hover {
        color: ${(props) => props.theme.colors.primary.normal};
      }
    }
  }
`;
