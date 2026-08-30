import React, { ReactElement } from "react";
import styled, { CSSObject } from "@emotion/styled";
import type { ContrastDisplayResult } from "../../utils/contrast-results";

export interface ColorCardProps extends Pick<
  ContrastDisplayResult,
  "heading" | "metricLabel" | "metricValue" | "rows"
> {
  color: string;
  isNotImportant?: boolean;
}

interface StyledColorCardProps {
  isNotImportant?: boolean;
}
const StyledColorCard = styled.div<StyledColorCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 8rem;
  min-width: 12rem;
  overflow: hidden;
  opacity: ${(props): string | undefined => (props.isNotImportant ? "0.1" : undefined)};
  text-align: center;
  transition: opacity ease-in;
`;

export const StyledCardRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface StyledColorSwatchProps {
  color: string;
}
const StyledColorSwatch = styled.div<StyledColorSwatchProps>`
  color: ${(props): string => props.color};
  flex: 1;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
`;

interface StyledColorCardPillProps {
  status?: "success" | "error";
}
const getStatusStyles = (props: StyledColorCardPillProps): CSSObject => {
  switch (props.status) {
    case "success": {
      return { backgroundColor: "#CFFCDA", color: "#004215" };
    }
    case "error": {
      return { backgroundColor: "#FBDBDB", color: "#C52020" };
    }
    default: {
      return { backgroundColor: "#F7F8F8", color: "#666D70" };
    }
  }
};
const StyledColorCardPill = styled.span<StyledColorCardPillProps>`
  ${getStatusStyles};
  border-radius: 3px;
  display: inline-block;
  font-size: 12px;
  padding: 1px 4px;
`;

const ColorCard: React.FC<ColorCardProps> = ({
  color,
  heading,
  isNotImportant,
  metricLabel,
  metricValue,
  rows,
}: ColorCardProps): ReactElement<HTMLDivElement> => {
  return (
    <StyledColorCard data-testid="colorCard" isNotImportant={isNotImportant}>
      <StyledCardRow>
        <StyledColorCardPill title={metricLabel}>{metricValue}</StyledColorCardPill>
      </StyledCardRow>
      <StyledCardRow>
        <StyledColorSwatch color={color} data-testid="colorCard-swatch">
          {heading}
        </StyledColorSwatch>
      </StyledCardRow>
      <StyledCardRow>
        {rows.map((row) => (
          <StyledColorCardPill key={row.label} status={row.meets ? "success" : "error"}>
            {row.label}: {row.value}
          </StyledColorCardPill>
        ))}
      </StyledCardRow>
    </StyledColorCard>
  );
};

export { ColorCard };
