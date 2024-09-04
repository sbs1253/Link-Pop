import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SpaceDashboardOutlined, ControlPoint, LogoutOutlined } from '@mui/icons-material';
import { useUserStore } from '@store/useUserStore';
import { usePlaylistStore } from '@store/usePlaylistStore';
const Footer = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      onClick: () => {
        navigate('/');
      },
      icon: <SpaceDashboardOutlined></SpaceDashboardOutlined>,
      text: 'Home',
    },
    {
      icon: <ControlPoint className="listAdd"></ControlPoint>,
      text: '',
    },
    {
      onClick: () => {
        useUserStore.persist.clearStorage();
        usePlaylistStore.persist.clearStorage();
        navigate('/login');
      },
      icon: <LogoutOutlined></LogoutOutlined>,
      text: 'Logout',
    },
  ];
  return (
    <FooterContainer>
      <ul>
        {buttons.map((button, index) => (
          <li key={index} onClick={button.onClick}>
            {button.icon}
            <span>{button.text}</span>
          </li>
        ))}
      </ul>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.nav`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  border-top: 1px solid ${(props) => props.theme.colors.background[3]};
  padding: 10px 20px;
  font-size: var(--font-size-body-regular);
  line-height: var(--line-height-body-regular);
  font-weight: var(--font-weight-body-regular);

  & ul {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    & li {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      height: 100%;
      transition: color 0.3s;
      cursor: pointer;
      & .listAdd {
        font-size: 30px;
      }
      & img {
        width: 26px;
        height: 26px;
        border-radius: 50%;
      }

      &:hover {
        color: ${(props) => props.theme.colors.primary.normal};
      }
    }
  }
`;
