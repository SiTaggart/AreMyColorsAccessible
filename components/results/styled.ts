import styled from '@emotion/styled';
import { breakpoint } from '../../styles/utils';
import { Heading } from '../typography';

export const ContrastResults = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  text-align: center;

  ${breakpoint('small')} {
    margin-bottom: 3rem;
  }

  ${breakpoint('medium')} {
    margin-bottom: 5rem;
  }
`;

export const ContrastResultsHeading = styled(Heading)`
  font-size: 20vw;
  margin: 3rem 0;
  width: 100%;

  ${breakpoint('small')} {
    font-size: 18vw;
    margin: 4rem 0;
  }

  ${breakpoint('medium')} {
    font-size: 15vw;
    margin: 5rem 0;
  }

  ${breakpoint('xlarge')} {
    font-size: 9vw;
  }
`;

export const ContrastResult = styled.div`
  flex: 1 1 auto;
  margin-bottom: 2rem;
  width: 100%;

  ${breakpoint('xsmall')} {
    width: 50%;
  }

  ${breakpoint('medium')} {
    width: 25%;
  }
`;

export const ContrastResultRating = styled(Heading)`
  font-size: 10vw;
  margin: 0;

  ${breakpoint('small')} {
    font-size: 6vw;
  }

  ${breakpoint('medium')} {
    font-size: 4vw;
  }

  ${breakpoint('xlarge')} {
    font-size: 3vw;
  }
`;

export const ContrastResultDesc = styled.p<{ isLarge?: boolean }>`
  font-size: ${(props): string => (props.isLarge ? '18pt' : '14pt')};
  margin: 0;
`;
