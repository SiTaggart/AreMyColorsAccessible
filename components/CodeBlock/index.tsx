import * as React from 'react';
import { Highlight, Language, themes } from 'prism-react-renderer';
import { Box } from '@twilio-paste/core/box';
import { useUIDSeed } from '@twilio-paste/core/uid-library';

interface FunctionalComponent {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Pre: React.FC<FunctionalComponent> = ({ children, ...props }: FunctionalComponent) => (
  <Box
    as="pre"
    fontFamily="fontFamilyCode"
    marginBottom="space70"
    overflowX="auto"
    padding="space40"
    {...props}
  >
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
    <Highlight code={example} language={language} theme={themes.nightOwl}>
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
