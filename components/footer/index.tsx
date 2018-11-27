import React from 'react';
import Link from 'next/link';
import './footer.scss';

interface IFooterProps {
  styles?: { footerLinks?: object };
}

const Footer: React.FunctionComponent<IFooterProps> = (props: IFooterProps) => {
  const linkStyles: object | undefined = props.styles ? props.styles.footerLinks : undefined;
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a style={linkStyles}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/palette">
              <a style={linkStyles}>Palette</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a style={linkStyles}>About</a>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
