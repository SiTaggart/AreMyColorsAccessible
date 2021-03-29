import React from 'react';
import { Theme } from '@twilio-paste/core/theme';
import { useUID } from '@twilio-paste/core/uid-library';
import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Stack } from '@twilio-paste/core/stack';
import { Separator } from '@twilio-paste/core/separator';
import { Label } from '@twilio-paste/core/label';
import { Input } from '@twilio-paste/core/input';
import { Container } from '../components/layouts/container';
import { Footer } from '../components/footer';
import { Layout } from '../components/layouts/layout';
import { CodeBlock } from '../components/CodeBlock';

const URL = `https://www.aremycolorsaccessible.com/api/are-they`.trim();
const Params = `
{
  "colors": ["#fff", "#000"]
}
`.trim();
const returnBlock = `
{
  "Small": "AAA" | "AA" | "A" | "Fail",
  "Bold": "AAA" | "AA" | "A" | "Fail",
  "Large": "AAA" | "AA" | "A" | "Fail",
  "Overall": "Yup" | "Kinda" | "Nope",
  "Contrast": string,
}
`.trim();

const APIPage: React.FC = () => {
  const [foreground, setForeground] = React.useState('#5c0700');
  const foregroundID = useUID();
  const [background, setBackground] = React.useState('#e4ef65');
  const backgroundID = useUID();
  const [result, setResult] = React.useState({});

  const exampleFetch = `
fetch('https://www.aremycolorsaccessible.com/api/are-they', {
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify({ colors: ['${foreground}', '${background}'] }),
})
  .then((response) => response.json())
  .then((json) => {
    doSomethingWithJSON(json)
  });
`.trim();

  const getResult = (fg: string, bg: string): Promise<void> =>
    fetch('/api/are-they', {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ colors: [fg, bg] }),
    })
      .then((response) => response.json())
      .then((json) => setResult(json));

  React.useEffect(() => {
    getResult(foreground, background);
  }, [foreground, background]);

  return (
    <Theme.Provider customBreakpoints={['240px', '320px', '468px', '768px', '1024px']}>
      <Container variant="palette">
        <Layout variant="small">
          <Box as="main" paddingTop="space70">
            <Heading as="h1" variant="heading10">
              Are My Colours Accessible API
            </Heading>
            <Paragraph>
              Use the API to quickly return the colour contrast ratio of two colors and its rating.
            </Paragraph>
            <Heading as="h2" variant="heading30">
              URL:
            </Heading>
            <Paragraph>Post data as the body of a request to:</Paragraph>
            <CodeBlock example={URL} language="bash" />
            <Heading as="h2" variant="heading30">
              Params:
            </Heading>
            <Paragraph>Set the body as a valid JSON string of an array of 2 colors.</Paragraph>
            <CodeBlock example={Params} language="json" />
            <Heading as="h2" variant="heading30">
              Return:
            </Heading>
            <Paragraph>You'll be returned an object in the following shape:</Paragraph>
            <CodeBlock example={returnBlock} language="tsx" />

            <Separator orientation="horizontal" verticalSpacing="space140" />

            <Heading as="h2" variant="heading30">
              Example:
            </Heading>
            <Paragraph>Your implementation might look like this:</Paragraph>

            <CodeBlock example={exampleFetch} language="jsx" />

            <Grid
              gutter="space40"
              marginBottom="space70"
              vertical={[true, true, true, true, false]}
            >
              <Column>
                <Stack orientation="vertical" spacing="space70">
                  <>
                    <Label htmlFor={foregroundID}>Foreground</Label>
                    <Input
                      id={foregroundID}
                      insertAfter={<>{foreground}</>}
                      onChange={(e) => setForeground(e.currentTarget.value)}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      type="color"
                      value={foreground}
                    />
                  </>
                  <>
                    <Label htmlFor={backgroundID}>Background</Label>
                    <Input
                      id={backgroundID}
                      insertAfter={<>{background}</>}
                      onChange={(e) => setBackground(e.currentTarget.value)}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      type="color"
                      value={background}
                    />
                  </>
                  <Box
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    backgroundColor={background}
                    borderRadius="borderRadius20"
                    padding="space40"
                  >
                    <Box
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      color={foreground}
                    >
                      Foreground {foreground}
                    </Box>
                  </Box>
                </Stack>
              </Column>
              <Column>
                <Box
                  as="pre"
                  backgroundColor="colorBackground"
                  borderRadius="borderRadius20"
                  fontFamily="fontFamilyCode"
                  overflowX="auto"
                  padding="space40"
                >
                  {JSON.stringify(result, undefined, 2)}
                </Box>
              </Column>
            </Grid>
            <Separator orientation="horizontal" verticalSpacing="space140" />
            <Heading as="h2" variant="heading30">
              Example CodeSandbox:
            </Heading>
            <Paragraph>
              Just to give you a full playground to play with, here is a CodeSandbox we prepared
              earlier
            </Paragraph>
            <iframe
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              src="https://codesandbox.io/embed/are-my-colours-accessible-api-tpdz2?fontsize=14&hidenavigation=1&theme=dark"
              style={{
                width: '100%',
                height: '500px',
                border: 0,
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              title="Are My Colours Accessible API"
            />
          </Box>
        </Layout>
        <Footer />
      </Container>
    </Theme.Provider>
  );
};

// eslint-disable-next-line import/no-default-export
export default APIPage;
