interface lastfmArtist {
  url: string;
  name: string;
  mbid: string;
}

interface lastfmImage {
  size: string;
  '#text': string;
}

interface lastfmStreamable {
  fulltrack: string;
  '#text': string;
}

export interface lastfmData {
  artist?: lastfmArtist;
  '@attr': { rank: string };
  mbid: string;
  url: string;
  duration?: string;
  playcount: string;
  image: lastfmImage[];
  name: string;
  streamable: lastfmStreamable | string;
}
