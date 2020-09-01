import { gql } from "@apollo/client";

// https://www.apollographql.com/docs/react/api/link/apollo-link-rest/#export-directive
// Query for searching through OMDB for matches based on input
export const SEARCH_TITLE = gql`
  query SearchTitle($title: String) {
    titles(s: $title) @rest(method: "GET", path: "?apikey=${process.env.REACT_APP_API_KEY}&{args}") {
        Search {
            Title
            Year
            imdbID
            Type
            Poster
          }
      }
    }
  `;

// Query to get a single title using ?t or i from OMDB
export const GET_TITLE = gql`
  query GetTitle($title: String) {
    title(t: $title) @rest(method: "GET", path: "?apikey=${process.env.REACT_APP_API_KEY}&{args}") {
      Title
      Year
      imdbID
      Type
      Poster
    }
  }
`;
