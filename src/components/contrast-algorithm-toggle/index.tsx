import type { ReactElement } from "react";
import type { ContrastAlgorithm } from "../../types";
import { StyledFieldset, StyledLegend, StyledOption, StyledOptions, StyledRadio } from "./styled";

export interface ContrastAlgorithmToggleProps {
  algorithm: ContrastAlgorithm;
  align?: "start" | "center";
  onChange: (algorithm: ContrastAlgorithm) => void;
}

const ContrastAlgorithmToggle = ({
  algorithm,
  align = "start",
  onChange,
}: ContrastAlgorithmToggleProps): ReactElement => (
  <StyledFieldset align={align}>
    <StyledLegend>Algorithm</StyledLegend>
    <StyledOptions align={align}>
      <StyledOption>
        <StyledRadio
          checked={algorithm === "wcag2"}
          name="contrast-algorithm"
          onChange={() => onChange("wcag2")}
          type="radio"
          value="wcag2"
        />
        WCAG 2.x
      </StyledOption>
      <StyledOption>
        <StyledRadio
          checked={algorithm === "apca"}
          name="contrast-algorithm"
          onChange={() => onChange("apca")}
          type="radio"
          value="apca"
        />
        APCA
      </StyledOption>
    </StyledOptions>
  </StyledFieldset>
);

export { ContrastAlgorithmToggle };
