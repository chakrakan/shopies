import React from "react";
import { Card, TextField, Icon } from "@shopify/polaris";
import { SearchMajorMonotone } from "@shopify/polaris-icons";

interface ISearchBox {
  title: string;
  setTitle: Function;
  refetch: Function;
}
/**
 * Search box representation
 */
const SearchBox = ({ title, setTitle, refetch }: ISearchBox) => {
  return (
    <Card sectioned>
      <TextField
        prefix={<Icon source={SearchMajorMonotone} color="inkLighter" />}
        label="Movie Title"
        type="search"
        placeholder="Search Title..."
        value={title}
        onChange={(newTitle) => {
          setTitle(newTitle);
          refetch({ variables: { title: newTitle } });
        }}
      />
    </Card>
  );
};

export default SearchBox;
