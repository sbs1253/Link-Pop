export interface UserType {
  id: string;
  username: string;
  email: string;
  subscribedPlaylists: string[];
  likedPlaylists: string[];
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
  creator: string;
  tracks: TrackType[];
  comments: Comment[];
  likes: number;
  dislikes: number;
  createdAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
