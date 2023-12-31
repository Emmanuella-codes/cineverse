export interface Movie {
  adult: boolean;
  backdrop_path?: string;
  genre_ids?: [];
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  media_type?: string;
}

export interface Genre {
  id: number;
  name: string;
}

//requires movie id
export interface MovieDetails {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path?: string;
  };
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  runtime?: number;
  title?: string;
  tagline?: string;
  videos?: {
    results: Array<Video>;
  };
  casts?: {
    cast: MovieCast;
    crew: MovieCrew;
  };
}

//requires series id
export interface SeriesDetails {
  adult?: boolean;
  backdrop_path?: string;
  created_by?: Array<{
    id: number;
    name: string;
  }>;
  episode_run_time?: number;
  first_air_date?: string;
  genres?: Array<Genre>;
  homepage?: string;
  id?: number;
  languages?: [];
  last_air_date?: string;
  name?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: [];
  original_name?: string;
  overview: string;
  popularity?: number;
  poster_path?: string;
  media_type?: string;
  videos?: {
    results: Array<Video>;
  };
  aggregate_credits?: {
    casts: Array<MovieCast>;
    crew: Array<MovieCrew>;
  };
}

export interface MovieCast {
  id?: number;
  name: string;
  cast_id: number;
  profile_path: string;
  character?: string;
  order: number;
  roles?: Array<{
    character: string;
    episode_count: number;
  }>;
}

export interface MovieCrew {
  id?: number;
  name: string;
  job: string;
  department: string;
  jobs?: Array<{
    job: string;
  }>;
  profile_path: string;
}

export interface Video {
  name: string;
  key: string;
  site: string;
  type: string;
  id: string;
  size: number;
}
