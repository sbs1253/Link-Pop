import styled from 'styled-components';
import { NotificationsNoneOutlined, Search, LogoutOutlined } from '@mui/icons-material';
import { useUserStore } from '@store/useUserStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.action.logout);
  const navbarAction = [
    {
      onClick: () => {
        return null;
      },
      icon: <Search></Search>,
    },
    {
      onClick: () => {
        return null;
      },
      icon: <NotificationsNoneOutlined></NotificationsNoneOutlined>,
    },
    {
      onClick: () => {
        logout();
        useUserStore.persist.clearStorage();
        navigate('/login');
      },
      icon: <LogoutOutlined></LogoutOutlined>,
    },
  ];
  return (
    <HeaderContainer>
      <div className="header__logo">
        <img src="/assets/logo.png" alt="logo" />
        <span>Studio</span>
      </div>
      <ul className="header__nav">
        {navbarAction.map((action, index) => (
          <li key={index} onClick={action.onClick}>
            {action.icon}
          </li>
        ))}
      </ul>
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
