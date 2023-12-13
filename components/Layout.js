import styled from "styled-components";

export const StyledPage = styled.div`
  margin: 3.5rem 0;
`;

export const ListHeading = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  display: flex;
  justify-content: center;
`;

export const StyledSnippetList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

/// >>>>>>>> STYLES FOR INDEX.JS <<<<<<<<///

export const StyledLastSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 0.5rem;
  background-color: #c1d2d7;
  margin: 0 1.5rem;
  &:focus-within {
    outline: 2px solid var(--primary-color);
    border-radius: 0.5rem;
    transition: outline 0.3s ease;
  }
`;
export const StyledSearchBarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #c1d2d7;
`;
export const StyledSearchBarForm = styled.form`
  height: 100%;
  width: 100%;
`;
export const StyledSearchBarInput = styled.input`
  outline: none;
  background-color: transparent;
  border: none;
  height: 100%;
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
`;
export const StyledButton = styled.button`
  border: none;
  background: transparent;
`;
export const StyledDropdown = styled.div`
  margin: 0 24px;
`;
export const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;
export const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0;
`;
export const StyledLine = styled.hr`
  margin: 0;
  border: none;
  height: 0.01rem;
  background-color: var(--primary-color);
`;
export const StyledSorryMessage = styled.h3`
  margin: 1.5rem;
  color: var(--primary-color);
  text-align: center;
`;
