export interface UserType {
  id: string;
  username: string;
  email: string;
  img: string;
  likedPlaylists: Record<string, boolean>;
  dislikedPlaylists: Record<string, boolean>;
  subscribedPlaylists: Record<string, boolean>;
  createdPlaylists: Record<string, boolean>;
}

export interface TrackType {
  title: string;
  url: string;
}

export interface CommentType {
  user: string;
  comment: string;
}

export interface PlaylistType {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creator: PlaylistCreator;
  tracks: TrackType[];
  comments: Comment[];
  likes: number;
  dislikes: number;
  createdAt: number;
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
