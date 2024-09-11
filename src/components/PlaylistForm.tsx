import { usePlaylistAddQuery } from '@services/reactQuery/usePlaylistAddQuery';
import styled from 'styled-components';
import { DEFAULT_PLAYLIST } from '../constants/playlist';
import { useUserStore } from '@store/useUserStore';
import { usePlaylistUpdateQuery } from '@services/reactQuery/usePlaylistUpdateQuery';
import { PlaylistType } from '@store/types';
interface PlaylistFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  playlist?: PlaylistType;
  isEdit?: boolean;
}
interface InputValuesType {
  [k: string]: FormDataEntryValue;
}
const PlaylistForm = ({ setOpen, playlist, isEdit = false }: PlaylistFormProps) => {
  const { mutate: addMutate } = usePlaylistAddQuery();
  const { mutate: updateMutate } = usePlaylistUpdateQuery();
  const user = useUserStore((state) => state.user);

  const updatePlaylist = (inputValues: InputValuesType) => {
    const updatedPlaylist = {
      ...playlist,
      ...inputValues,
    };
    updateMutate(updatedPlaylist as PlaylistType);
  };
  const newAddPlaylist = (inputValues: InputValuesType) => {
    const newPlaylist = {
      ...DEFAULT_PLAYLIST,
      ...inputValues,
      createdAt: Date.now(),
      creatorId: user.id,
      tracks: {},
    };
    addMutate(newPlaylist);
  };

  const handleFormSubmit = (inputValues: InputValuesType) => {
    if (isEdit && playlist) {
      updatePlaylist(inputValues);
    } else {
      newAddPlaylist(inputValues);
    }
    setOpen(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const inputValues: InputValuesType = Object.fromEntries(formData.entries());
    e.preventDefault();
    if (!inputValues.title || !inputValues.description) {
      return alert('내용을 입력해주세요.');
    }
    handleFormSubmit(inputValues);
  };
  return (
    <PlaylistAddFormContainer onClick={() => setOpen(false)}>
      <div className="form__modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="form__title">{isEdit ? '재생목록 수정하기' : '재생목록 생성하기'}</h3>
        <form className="form__box" onSubmit={handleSubmit}>
          <div className="form__text">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" defaultValue={playlist?.title || ''} placeholder="Enter Title" />
          </div>
          <div className="form__text">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              defaultValue={playlist?.description || ''}
              placeholder="Enter Description"
            />
          </div>
          <button type="submit">{isEdit ? '수정' : '생성'}</button>
        </form>
      </div>
    </PlaylistAddFormContainer>
  );
};

export default PlaylistForm;
const PlaylistAddFormContainer = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  & .form__modal {
    display: absolute;
    flex-direction: column;
    width: 80%;
    max-width: 500px;
    height: 50%;
    padding: 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.background[3]};
    color: ${(props) => props.theme.colors.text.title};
    overflow-y: scroll;
    & .form__title {
      width: 100%;
      text-align: center;
      margin: 10px 0;
    }
    & .form__box {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 18px;

      & .form__text {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      & input {
        border: solid 1.5px ${(props) => props.theme.colors.text.caption};
        border-radius: 1rem;
        background: none;
        padding: 10px;
        font-size: 16px;
        color: ${(props) => props.theme.colors.text.title};
      }
      & label {
        padding-left: 5px;
        color: ${(props) => props.theme.colors.text.title};
      }

      & button {
        background-color: ${(props) => props.theme.colors.success.normal};
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px;
        cursor: pointer;
        &:hover {
          background-color: ${(props) => props.theme.colors.success.hover};
        }
        &:disabled {
          background-color: ${(props) => props.theme.colors.success.disabled};
          cursor: not-allowed;
        }
      }
    }
  }
`;
