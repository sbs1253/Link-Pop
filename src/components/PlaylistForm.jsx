import { useState } from 'react';
import styled from 'styled-components';
import { usePlaylistAddQuery } from '../services/reactQuery/usePlaylistAddQuery';
const PlaylistForm = ({ userId, playlistId, togglePlaylist }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { mutate } = usePlaylistAddQuery();
  const addPlaylist = (e) => {
    e.preventDefault();

    const track = {
      title,
      url,
    };
    console.log(track);
    mutate(playlistId, track);
    setTitle('');
    setUrl('');
  };
  return (
    <PlaylistFormContainer onClick={(e) => togglePlaylist(e)}>
      <div className="form__modal" onClick={(e) => e.stopPropagation()}>
        <h3>재생목록 추가하기</h3>
        <form className="form__text" onSubmit={addPlaylist}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
          />
          <label htmlFor="url">Url</label>
          <input id="url" name="url" placeholder="Enter Url" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button type="submit">추가</button>
        </form>
      </div>
    </PlaylistFormContainer>
  );
};

export default PlaylistForm;

const PlaylistFormContainer = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  & .form__modal {
    display: absolute;
    flex-direction: column;
    width: 80%;
    height: 50%;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.background[3]};
    color: ${(props) => props.theme.colors.text.title};

    & h3 {
      margin: 10px auto;
    }
    & .form__text {
      position: relative;
      display: flex;
      flex-direction: column;

      & input {
        border: solid 1.5px #9e9e9e;
        border-radius: 1rem;
        background: none;
        padding: 10px;
        font-size: 16px;
        color: ${(props) => props.theme.colors.text.title};
      }
      & label {
      }

      & button {
        background-color: #1db954;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px;
        cursor: pointer;
        &:disabled {
          background-color: #1a7f3b;
          cursor: not-allowed;
        }
      }
    }
  }
`;
