import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
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
import { Toaster, useToaster } from '@twilio-paste/core/toast';
import { Container } from '../components/layouts/container';
import { Footer } from '../components/footer';
import { Layout } from '../components/layouts/layout';
import { CodeBlock } from '../components/CodeBlock';

const SlackAppPage: React.FC = ({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { success, error } = query;
  const toaster = useToaster();

  React.useEffect(() => {
    if (success) {
      toaster.push({
        variant: 'success',
        message: (
          <>
            <strong>Congratulations!</strong> You can now check contrast ratios of colors from
            within Slack using the Slash Command <code>/color-check</code>.
          </>
        ),
      });
    }
  }, [success]);

  React.useEffect(() => {
    if (error) {
      toaster.push({
        variant: 'error',
        message: (
          <>
            <strong>Unlucky!</strong> The Slack App was not installed on your Slack instance. If you
            didn&rsquo;t expect this, you can try again. Make sure you have the correct permissions.
          </>
        ),
      });
    }
  }, [error]);
  return (
    <Theme.Provider customBreakpoints={['240px', '320px', '468px', '768px', '1024px']}>
      <Head>
        <meta content="A01T044TRBK" name="slack-app-id" />
      </Head>
      <Toaster {...toaster} />
      <Container variant="palette">
        <Layout variant="small">
          <Box as="main" paddingTop="space70">
            <Heading as="h1" variant="heading10">
              Are My Colours Accessible Slack App
            </Heading>
            <Paragraph>
              Have you ever wanted to quickly check the color contrast of two colors whilst in
              Slack? Me neither, but for whatever reason I created this Slack App to do just that.
            </Paragraph>
            <Paragraph>
              It works by installing a Slash Command, which you can call from anywhere the App is
              installed.
            </Paragraph>
            <a href="https://slack.com/oauth/v2/authorize?scope=commands&client_id=2250788788.1918140943393&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fslack-oauth">
              <img
                alt="Add to Slack"
                height="40"
                src="https://platform.slack-edge.com/img/add_to_slack.png"
                srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                width="139"
              />
            </a>
          </Box>
        </Layout>
        <Footer />
      </Container>
    </Theme.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { query: context.query },
});

// eslint-disable-next-line import/no-default-export
export default SlackAppPage;
