export interface UserType {
  id: string;
  username: string;
  email: string;
  img: string;
  likedPlaylists?: PlaylistsType;
  dislikedPlaylists?: PlaylistsType;
  subscribedPlaylists?: PlaylistsType;
  createdPlaylists?: PlaylistsType;
}
export interface PlaylistsType {
  [key: string]: boolean;
}
export interface TrackType {
  title?: string;
  url?: string;
}

export interface CommentType {
  userId: string;
  comment: string;
  createdAt: number;
}

export interface PlaylistType {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creator: PlaylistCreator;
  tracks: TrackType;
  comments: { [key: string]: CommentType };
  likes: number;
  dislikes: number;
  createdAt: number;
}
export interface DefaultPlaylistType {
  comments: { [key: string]: CommentType };
  createdAt: number;
  creatorId: string;
  description: string;
  dislikes: number;
  likes: number;
  title: string;
  tracks: { [key: string]: string };
}
export interface PlaylistCreator {
  id: string;
  username: string;
  img: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
