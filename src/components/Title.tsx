import * as React from "react";
import { Layout, Thumbnail, Badge, Caption } from "@shopify/polaris";

/**
 * Movie interface for data from API
 */
export interface ITitleData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

/**
 * Contract interface for the component
 */
export interface ITitle {
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

/**
 * Representation of a Movie within our App
 * @param Title - the title of the movie from API
 * @param Year
 * @param Poster - URL to the poster for display
 *
 * The image is low res enough to warrant no further optimization for load times
 */
const Title: React.SFC<ITitle> = ({ Title, Year, Poster, Type }) => {
  const noPosterDefault = "https://us.bgxme.com/images/no-img.png";
  return (
    <Layout sectioned={true}>
      <Layout.Section>
        <Thumbnail
          source={Poster !== "N/A" ? Poster : noPosterDefault}
          alt={Title}
          size="large"
        ></Thumbnail>
      </Layout.Section>
      <Layout.Section>
        <Caption>{Title}</Caption>
        <Caption>({Year})</Caption>
        <Badge>{Type}</Badge>
      </Layout.Section>
    </Layout>
  );
};

export default Title;
