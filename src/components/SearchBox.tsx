import React from "react";
import { Card, TextField, Icon, TextFieldProps } from "@shopify/polaris";
import { SearchMajorMonotone } from "@shopify/polaris-icons";
import { ITitleData } from "../types/Title";

interface ISearchBox {
  title: string;
  nominations: Array<ITitleData>;
  onChange: TextFieldProps["onChange"];
}

/**
 * Search box representation
 */
const SearchBox: React.FC<ISearchBox> = ({
  title,
  nominations,
  onChange = () => {},
}) => {
  return (
    <Card sectioned>
      <TextField
        prefix={<Icon source={SearchMajorMonotone} color="inkLighter" />}
        label="Movie Title"
        type="search"
        placeholder="Search Title..."
        value={title}
        onChange={onChange}
        disabled={nominations.length >= 5 ? true : false}
      />
    </Card>
  );
};

export default SearchBox;
