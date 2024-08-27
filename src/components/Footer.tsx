import {
  SpaceDashboardOutlined,
  VideoLibraryOutlined,
  InsertChartOutlined,
  CommentOutlined,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      onClick: () => {
        navigate('/');
      },
      icon: <SpaceDashboardOutlined></SpaceDashboardOutlined>,
      text: 'Dashboard',
    },
    {
      onClick: () => {
        navigate('/content');
      },
      icon: <VideoLibraryOutlined></VideoLibraryOutlined>,
      text: 'Content',
    },
    {
      icon: <InsertChartOutlined></InsertChartOutlined>,
      text: 'Analytics',
    },
    {
      icon: <CommentOutlined></CommentOutlined>,
      text: 'Comments',
    },
    {
      icon: <img src="assets/profile.jpg" alt="profile" />,
      text: 'MY',
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
    justify-content: space-between;
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
