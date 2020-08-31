import React from "react";
import { Layout } from "@shopify/polaris";
import ResultList from "../components/ResultList";
import SearchBox from "../components/SearchBox";
import NominationList from "../components/NominationList";

/**
 * This will hold the context for the child Componenets
 */
const Context = () => {
  // mockData for now
  const mockSearchData = {
    Search: [
      {
        Title: "Hey Ram",
        Year: "2000",
        imdbID: "tt0222012",
        Type: "movie",
        Poster: "N/A",
      },
      {
        Title: "Ram Balram",
        Year: "1980",
        imdbID: "tt0081401",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTY0MTk0MTM3MV5BMl5BanBnXkFtZTcwOTIyNDE0MQ@@._V1_SX300.jpg",
      },
      {
        Title: "Dying to Know: Ram Dass & Timothy Leary",
        Year: "2014",
        imdbID: "tt2516424",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTVlMDZiZTItMDRjZC00MGViLTljNWYtODg2YTNkYjUyMTcxXkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_SX300.jpg",
      },
      {
        Title: "Ram Dass, Fierce Grace",
        Year: "2001",
        imdbID: "tt0310951",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTY4MTg5MzI2Nl5BMl5BanBnXkFtZTcwMTU5NDkxMQ@@._V1_SX300.jpg",
      },
    ],
    totalResults: "140",
    Response: "True",
  };

  // nominations mock data
  const mockNominationData = [
    {
      Title: "Ram Balram",
      Year: "1980",
      imdbID: "tt0081401",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTY0MTk0MTM3MV5BMl5BanBnXkFtZTcwOTIyNDE0MQ@@._V1_SX300.jpg",
    },
    {
      Title: "Ram Balram",
      Year: "1980",
      imdbID: "tt0081401",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTY0MTk0MTM3MV5BMl5BanBnXkFtZTcwOTIyNDE0MQ@@._V1_SX300.jpg",
    },
    {
      Title: "Ram Balram",
      Year: "1980",
      imdbID: "tt0081401",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTY0MTk0MTM3MV5BMl5BanBnXkFtZTcwOTIyNDE0MQ@@._V1_SX300.jpg",
    },
    {
      Title: "Dying to Know: Ram Dass & Timothy Leary",
      Year: "2014",
      imdbID: "tt2516424",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTVlMDZiZTItMDRjZC00MGViLTljNWYtODg2YTNkYjUyMTcxXkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_SX300.jpg",
    },
  ];

  return (
    <Layout sectioned={true}>
      <Layout.Section>
        <SearchBox></SearchBox>
      </Layout.Section>
      <Layout.Section oneHalf>
        <ResultList
          titles={mockSearchData.Search}
          nominations={mockNominationData}
        ></ResultList>
        <NominationList nominations={mockNominationData}></NominationList>
      </Layout.Section>
    </Layout>
  );
};

export default Context;
