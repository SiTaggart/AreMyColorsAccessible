import type { ReactElement } from "react";
import type { ContrastAlgorithm } from "../../types";

export interface ContrastAlgorithmToggleProps {
  algorithm: ContrastAlgorithm;
  onChange: (algorithm: ContrastAlgorithm) => void;
}

const ContrastAlgorithmToggle = ({
  algorithm,
  onChange,
}: ContrastAlgorithmToggleProps): ReactElement => (
  <fieldset>
    <legend>Contrast algorithm</legend>
    <label>
      <input
        checked={algorithm === "wcag2"}
        name="contrast-algorithm"
        onChange={() => onChange("wcag2")}
        type="radio"
        value="wcag2"
      />
      WCAG 2.x
    </label>
    <label>
      <input
        checked={algorithm === "apca"}
        name="contrast-algorithm"
        onChange={() => onChange("apca")}
        type="radio"
        value="apca"
      />
      APCA
    </label>
  </fieldset>
);

export { ContrastAlgorithmToggle };
