import * as React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { Box } from '@twilio-paste/core/box';
import { useUIDSeed } from '@twilio-paste/core/uid-library';

interface FunctionalComponent {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Pre: React.FC<FunctionalComponent> = ({ children, ...props }: FunctionalComponent) => (
  <Box as="pre" fontFamily="fontFamilyCode" marginBottom="space70" padding="space40" {...props}>
    {children}
  </Box>
);

const Line: React.FC<FunctionalComponent> = ({ children, ...props }: FunctionalComponent) => (
  <Box as="div" display="table-row" fontFamily="fontFamilyCode" {...props}>
    {children}
  </Box>
);

const LineContent: React.FC<FunctionalComponent> = ({
  children,
  ...props
}: FunctionalComponent) => (
  <Box as="span" display="table-cell" fontFamily="fontFamilyCode" {...props}>
    {children}
  </Box>
);

interface CodeBlockProps {
  example: string;
  language: Language;
}
export const CodeBlock: React.FC<CodeBlockProps> = ({
  example,
  language = 'jsx',
}: CodeBlockProps) => {
  const KeySeed = useUIDSeed();
  return (
    <Highlight {...defaultProps} code={example} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={KeySeed('line')} {...getLineProps({ line, key: i })}>
              <LineContent>
                {line.map((token, key) => (
                  <span key={KeySeed('content')} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};
