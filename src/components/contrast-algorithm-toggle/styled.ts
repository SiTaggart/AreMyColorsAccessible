import styled from "@emotion/styled";

export const StyledFieldset = styled.fieldset<{ align: "start" | "center" }>`
  border: 0;
  color: inherit;
  margin: 0;
  min-width: 0;
  /* Browsers put fieldset padding-top *between* legend and content — keep it 0 */
  padding: 0 1rem 1rem;
  text-align: ${(props): string => (props.align === "center" ? "center" : "start")};
  width: 100%;
`;

export const StyledLegend = styled.legend`
  /* float+width makes legend a real block so margin-bottom isn't eaten by legend layout quirks */
  display: block;
  float: left;
  font-size: 1.2rem;
  line-height: 1;
  /* With line-height:1 + floated legend, this margin is the real gap (~10px incl. g) */
  margin: 0 0 10px;
  padding: 0;
  width: 100%;
`;

export const StyledOptions = styled.div<{ align: "start" | "center" }>`
  clear: both;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: ${(props): string => (props.align === "center" ? "center" : "flex-start")};
`;

export const StyledOption = styled.label`
  cursor: pointer;
  display: inline-flex;
  font-size: 1.2rem;
  line-height: 1;
  /* room for underline without inventing gap above the glyphs */
  padding-bottom: 0.35em;
  position: relative;
  transition:
    font-weight 150ms ease-out,
    text-decoration-color 150ms ease-out;

  &:has(input:checked) {
    font-weight: 700;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 0.2em;
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
