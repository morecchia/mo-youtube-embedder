export interface Video {
  channelTitle: string;
  id: string;
  isLive: boolean;
  length: VideoLength;
  thumbnail: { thumbnails: Thumbnail[] };
  title: string;
  type: string;
}

interface VideoLength {
  accessibility: { label: string }
  simpleText: string;
}

interface Thumbnail {
  width: number;
  height: number;
  url: string;
}
