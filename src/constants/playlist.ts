import { CommentType } from 'src/store/types';
import { TrackType } from './../store/types';

export const DEFAULT_PLAYLIST: {
  comments: CommentType[];
  createdAt: number;
  creatorId: string;
  description: string;
  dislikes: number;
  likes: number;
  title: string;
  tracks: TrackType;
} = {
  comments: [],
  createdAt: 0,
  creatorId: '',
  description: '',
  dislikes: 0,
  likes: 0,
  title: '',
  tracks: {},
};
