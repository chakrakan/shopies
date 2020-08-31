import React, { useState, useCallback } from "react";
import { Card, TextField, Icon } from "@shopify/polaris";
import { SearchMajorMonotone } from "@shopify/polaris-icons";
/**
 * Search box representation
 */
const SearchBox = () => {
  const [title, setTitle] = useState("");
  const handleChange = useCallback((newTitle) => setTitle(newTitle), []);

  return (
    <Card sectioned>
      <TextField
        prefix={<Icon source={SearchMajorMonotone} color="inkLighter" />}
        label="Movie Title"
        type="search"
        placeholder="Search Title..."
        value={title}
        onChange={handleChange}
      />
    </Card>
  );
};

export default SearchBox;
