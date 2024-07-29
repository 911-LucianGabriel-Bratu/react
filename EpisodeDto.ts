export interface EpisodeDto {
  id: number;
  episodeNr: string;
  releaseDate: Date;
  airDate: Date;
  country: string;
  platform: string;
  createdDate?: Date;
  inWatchlist?: boolean;
}
