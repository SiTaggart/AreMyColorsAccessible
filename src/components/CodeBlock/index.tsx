import { Box } from '@twilio-paste/core/box';
import { useUIDSeed } from '@twilio-paste/core/uid-library';
import { Highlight, Language, themes } from 'prism-react-renderer';
import React from 'react';

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
      {({ className, getLineProps, getTokenProps, style, tokens }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={KeySeed('line')} {...getLineProps({ key: i, line })}>
              <LineContent>
                {line.map((token, key) => (
                  <span key={KeySeed('content')} {...getTokenProps({ key, token })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};
