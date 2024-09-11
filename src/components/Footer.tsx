import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SpaceDashboardOutlined, ControlPoint } from '@mui/icons-material';
import PlaylistForm from '@components/PlaylistForm';
import { useToggle } from '@hooks/useToggle';

const Footer = () => {
  const [open, setOpen] = useToggle();
  const buttons = [
    {
      icon: (
        <Link to={'/'}>
          <SpaceDashboardOutlined></SpaceDashboardOutlined>
        </Link>
      ),
      text: 'Home',
    },
    {
      onClick: () => {
        setOpen(true);
      },
      icon: <ControlPoint className="listAdd"></ControlPoint>,
      text: '',
    },
    {
      icon: (
        <Link to={'/profile'}>
          <img src="/assets/profile.jpg" alt="profile" />
        </Link>
      ),
      text: 'Profile',
    },
  ];
  return (
    <FooterContainer>
      {open && <PlaylistForm setOpen={() => setOpen(false)} />}
      <ul>
        {buttons.map((button, index) => (
          <li key={index} onClick={button.onClick ? button.onClick : undefined}>
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
  background-color: ${(props) => props.theme.colors.background[1]};
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
