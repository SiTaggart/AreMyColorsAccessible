import styled from "@emotion/styled";

export const StyledFieldset = styled.fieldset<{ align: "start" | "center" }>`
  border: 0;
  color: inherit;
  margin: 0;
  min-width: 0;
  padding: 1rem;
  text-align: ${(props): string => (props.align === "center" ? "center" : "start")};
  width: 100%;
`;

export const StyledLegend = styled.legend`
  display: block;
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
  padding: 0;
  width: 100%;
`;

export const StyledOptions = styled.div<{ align: "start" | "center" }>`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: ${(props): string => (props.align === "center" ? "center" : "flex-start")};
`;

export const StyledOption = styled.label`
  cursor: pointer;
  display: inline-flex;
  font-size: 1.2rem;
  line-height: 1.4;
  position: relative;
  transition:
    font-weight 150ms ease-out,
    text-decoration-color 150ms ease-out;

  &:has(input:checked) {
    font-weight: 700;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 0.3em;
  }

  &:has(input:focus-visible) {
    outline: currentColor dashed 2px;
    outline-offset: 3px;
  }
`;

export const StyledRadio = styled.input`
  cursor: pointer;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;
