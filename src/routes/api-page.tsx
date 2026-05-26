import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@twilio-paste/core/box';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Heading } from '@twilio-paste/core/heading';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { Theme } from '@twilio-paste/core/theme';
import { useUID } from '@twilio-paste/core/uid-library';
import React from 'react';

import { CodeBlock } from '~/components/CodeBlock';
import { Footer } from '~/components/footer';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/layout';

export const Route = createFileRoute('/api-page')({
  component: ApiPage,
});

const PostURL = `https://www.aremycolorsaccessible.com/api/are-they`.trim();
const PostBody = `
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

function ApiPage(): React.ReactElement {
  const [foreground, setForeground] = React.useState('#5c0700');
  const foregroundID = useUID();
  const [background, setBackground] = React.useState('#e4ef65');
  const backgroundID = useUID();
  const [postResult, setPostResult] = React.useState<unknown>({});

  const examplePostFetch = `
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

  const getPostResult = (fg: string, bg: string): Promise<void> =>
    fetch('/api/are-they', {
      body: JSON.stringify({ colors: [fg, bg] }),
      method: 'POST',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((json) => setPostResult(json));

  React.useEffect(() => {
    getPostResult(foreground, background);
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
            <CodeBlock example={PostURL} language="typescript" />
            <Heading as="h2" variant="heading30">
              Params:
            </Heading>
            <Paragraph>Set the body as a valid JSON string of an array of 2 colors.</Paragraph>
            <CodeBlock example={PostBody} language="json" />
            <Heading as="h2" variant="heading30">
              Return:
            </Heading>
            <Paragraph>You&apos;ll be returned an object in the following shape:</Paragraph>
            <CodeBlock example={returnBlock} language="typescript" />
            <Heading as="h2" variant="heading30">
              Example:
            </Heading>
            <Paragraph>Your implementation might look like this:</Paragraph>
            <CodeBlock example={examplePostFetch} language="typescript" />
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
                      insertAfter={foreground}
                      onChange={(e) => setForeground(e.currentTarget.value)}
                      // @ts-expect-error Paste Input does not type `color` but renders a native colour picker.
                      type="color"
                      value={foreground}
                    />
                  </>
                  <>
                    <Label htmlFor={backgroundID}>Background</Label>
                    <Input
                      id={backgroundID}
                      insertAfter={background}
                      onChange={(e) => setBackground(e.currentTarget.value)}
                      // @ts-expect-error Paste Input does not type `color` but renders a native colour picker.
                      type="color"
                      value={background}
                    />
                  </>
                  <Box
                    // @ts-expect-error Paste Box backgroundColor expects a theme token; a raw hex is intentional here.
                    backgroundColor={background}
                    borderRadius="borderRadius20"
                    padding="space40"
                  >
                    <Box
                      // @ts-expect-error Paste Box color expects a theme token; a raw hex is intentional here.
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
                  {JSON.stringify(postResult, undefined, 2)}
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
                border: 0,
                borderRadius: '4px',
                height: '500px',
                overflow: 'hidden',
                width: '100%',
              }}
              title="Are My Colours Accessible API"
            />
          </Box>
        </Layout>
        <Footer />
      </Container>
    </Theme.Provider>
  );
}
