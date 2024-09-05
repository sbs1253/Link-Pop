import { styled } from 'styled-components';
const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return <DeletebuttonItem onClick={onClick}>삭제</DeletebuttonItem>;
};

export default DeleteButton;

const DeletebuttonItem = styled.button`
  position: absolute;
  right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primary.normal};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.active};
  }
`;
