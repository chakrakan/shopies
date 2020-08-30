import * as React from "react";
import { Thumbnail } from "@shopify/polaris";

export interface IMovie {
  Title: string;
  Year: string;
  Poster: string;
  Genre: string;
}

const Movie: React.SFC<IMovie> = ({ Title, Year, Poster, Genre }) => {
  return (
    <div>
      <Thumbnail source={Poster} alt={Title} size="large"></Thumbnail>
      <div>
        <p>{Title}</p>
        <p>{Year}</p>
        <p>{Genre}</p>
      </div>
    </div>
  );
};

export default Movie;
