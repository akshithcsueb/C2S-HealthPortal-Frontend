/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function SearchPatient({ setSearchTerm }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  return (
    <Form onSubmit={handleSearch}>
      <Input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search patient..."
      />
      <Button type="submit">Search</Button>
    </Form>
  );
}

export default SearchPatient;
