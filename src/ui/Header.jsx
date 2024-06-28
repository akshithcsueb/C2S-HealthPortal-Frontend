import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import Heading from "./Heading";
// import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: space-between; /* Change this line */
`;

function Header() {
  return (
    <StyledHeader>
      <Heading as="h3">C2S Health Portal</Heading>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
