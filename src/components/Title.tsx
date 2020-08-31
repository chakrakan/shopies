import * as React from "react";
import { Layout, Thumbnail, Badge, Caption } from "@shopify/polaris";
import { ITitleData } from "../types/Title";
import NoImg from "../assets/no-img.png";

/**
 * Representation of a Movie within our App
 * @param Title - the title of the movie from API
 * @param Year
 * @param Poster - URL to the poster for display
 *
 * The image is low res enough to warrant no further optimization for load times
 */
const Title: React.SFC<ITitleData> = ({
  Title,
  Year,
  imdbID,
  Poster,
  Type,
}) => {
  return (
    <Layout sectioned={true}>
      <Layout.Section oneHalf>
        <Thumbnail
          source={Poster !== "N/A" ? Poster : NoImg}
          alt={Title}
          size="large"
        ></Thumbnail>
      </Layout.Section>
      <Layout.Section oneHalf>
        <Badge>{Type}</Badge>
        <Caption>{Title}</Caption>
        <Caption>({Year})</Caption>
      </Layout.Section>
    </Layout>
  );
};

export default Title;
