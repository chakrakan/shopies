/**
 * Interface for Title data from the API
 */
export interface ITitleData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

/**
 * Interface to grab data from search response
 */
export interface ITitleSearchData {
  titles: {
    Search: Array<ITitleData>;
  };
}

export interface ITitleSearchVar {
  s: string;
}

export interface ITitleGetVar {
  t: string;
}
