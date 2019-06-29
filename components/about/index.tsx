import React, { ReactElement } from 'react';
import Container from '../layouts/container';
import Layout from '../layouts/layout';
import { Heading, P, Blockquote, Link } from '../typography';

const About: React.FC<{}> = (): ReactElement => (
  <Container variant="about">
    <Layout variant="small">
      <Heading as="h1" variant="10">
        Are my Colours Accessible?
      </Heading>
      <P>
        Why? Well, apart from being an excuse to use a domain name, colour contrast and the use of
        colour is extremely important for certain groups of people with varying levels of visional
        impairment.
      </P>
      <Blockquote>
        <P>
          Information and user interface components must be presentable to users in ways they can
          perceive. <br />
          <cite>
            &ndash;{' '}
            <Link href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#perceivable">
              Principle 1: Perceivable
            </Link>
            , WCAG 2.0 Guidelines
          </cite>
        </P>
      </Blockquote>
      <Blockquote>
        <P>
          Make it easier for users to see and hear content including separating foreground from
          background.
          <br />
          <cite>
            &ndash;{' '}
            <Link href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast">
              Guideline 1.4 Distinguishable:
            </Link>{' '}
            WCAG 2.0 Guidelines
          </cite>
        </P>
      </Blockquote>
      <Blockquote>
        <P>
          The visual presentation of text and images of text has a contrast ratio of at least 4.5:1,
          except for the following: (Level AA).
          <br />
          <cite>
            &ndash;{' '}
            <Link href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast">
              1.4.3 Contrast (Minimum):
            </Link>{' '}
            WCAG 2.0 Guidelines
          </cite>
        </P>
      </Blockquote>
      <P>
        For text-based information to be perceivable by all users regardless of level of sight and
        to safely meet WCAG 2.0, AA requirements, you should aim for a minimum contrast ratio of
        4.5:1 for all text content. There are 2 exceptions to this; large text that is 18pt or 24px
        and above or <strong>bold</strong> text that is 14pt or 18px and above, where the minimum
        contrast ratio can be 3.0:1
      </P>
      <P>
        Building upon and heavily influenced by the excellent{' '}
        <Link href="http://jxnblk.com/colorable/">Colorable</Link>, I wanted more context around the
        result. When you share the outcome with your colleagues, all the results, rules and what
        you&rsquo;re aiming for, is easily understandable for when you have those awkward
        conversations with designers and marketers.
      </P>
      <P>Accessibility doesn&rsquo;t have to be ugly.</P>
      <P>
        Built by <Link href="http://www.simontaggart.com">Simon Taggart</Link>,{' '}
        <Link href="https://github.com/SiTaggart/AreMyColorsAccessible">code on GitHub</Link>,{' '}
        <Link href="https://zeit.co/now">hosted on Now</Link>.
      </P>
    </Layout>
  </Container>
);
export default About;
