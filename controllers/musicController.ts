import axios from 'axios';
import type { Request, Response } from 'express';
import type { lastfmData } from '../types/lastfm';

const LASTFM_URL = 'http://ws.audioscrobbler.com/2.0/';

const parseLastfmData = (objects: lastfmData[]) => {
  return objects.map((object: lastfmData) => {
    return {
      rank: object['@attr'].rank,
      name: object.name,
      artist: object?.artist?.name,
      duration: object?.duration,
      url: object.url,
      image: object.image[1]['#text'],
      playcount: object.playcount,
    };
  });
};

export const getWeeklyChartList = async (req: Request, res: Response) => {
  const chartMethods = ['user.gettopartists', 'user.gettopalbums', 'user.gettoptracks'];

  const chartPromises = chartMethods.map(chart => {
    return axios.get(`${LASTFM_URL}`, {
      params: {
        method: chart,
        user: process.env.LASTFM_USER,
        period: '7day',
        limit: 10,
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
      },
    });
  });

  const [artists, albums, tracks] = await Promise.all([...chartPromises]);

  return res.json({
    artists: parseLastfmData(artists?.data?.topartists?.artist),
    albums: parseLastfmData(albums?.data?.topalbums?.album),
    tracks: parseLastfmData(tracks?.data?.toptracks?.track),
  });
};
