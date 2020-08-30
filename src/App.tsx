import * as React from "react";
import { Page } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import "./App.css";
import Movie from "./components/Movie";

class App extends React.Component {
  render() {
    return (
      <Page title="The Shopies">
        <Movie
          Title="Alien"
          Poster="https://m.media-amazon.com/images/M/MV5BMmQ2MmU3NzktZjAxOC00ZDZhLTk4YzEtMDMyMzcxY2IwMDAyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
          Year="1979"
          Genre="Horror, Sci-Fi"
        >
        </Movie>
      </Page>
    );
  }
}

export default App;
