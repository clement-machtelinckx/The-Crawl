import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';

import styles from './index.module.css';



export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <main className="container">
        <h1>{siteConfig.title}</h1>
        <p>{siteConfig.tagline}</p>
        <Link to="/sessions">Aller au résumer des sessions</Link>
        <br />
        <Link to="/rules/Regles-Dcc/combat">Aller au règles</Link>
        <br />
        <Link to="/rules">somaire</Link>
      </main>
    </Layout>
  );
}
