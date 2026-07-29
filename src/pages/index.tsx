import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className="container">
        <p className={styles.eyebrow}>SOFTWARE ENGINEERING</p>

        <Heading as="h1" className={styles.title}>
          Robert Kim
        </Heading>

        <p className={styles.subtitle}>
          A hacker wannabe.
        </p>

        <div className={styles.actions}>
          <Link
            className="button button--primary button--lg"
            to="/articles">
            Read articles
          </Link>

          <Link
            className="button button--secondary button--lg"
            to="/projects">
            Explore projects
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageContent(): ReactNode {
  return (
    <main className={styles.main}>
      <div className="container">
        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <Heading as="h2">Articles</Heading>
            <Link to="/articles">View all →</Link>
          </div>

          <div className={styles.grid}>
            <Link
              className={styles.card}
              to="/articles/a-journey-to-concurrency">
              <span className={styles.cardType}>CONCURRENCY</span>
              <Heading as="h3">A Journey to Concurrency</Heading>
              <p>
                From assembly to multicores — how abstractions shaped the
                way we think about concurrent programs.
              </p>
            </Link>

            <Link
              className={styles.card}
              to="/articles/why-we-shouldn't-blindly-copy-paste-ai-generated-code">
              <span className={styles.cardType}>AI</span>
              <Heading as="h3">Why We Shouldn't Blindly Copy-Paste AI-Generated Code</Heading>
              <p>
                AI is autocompletion, not understanding. Why CS fundamentals
                matter more than ever in the age of generative code.
              </p>
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <Heading as="h2">Projects</Heading>
            <Link to="/projects">View all →</Link>
          </div>

          <div className={styles.grid}>
            <Link className={styles.card} to="/projects/comio">
              <span className={styles.cardType}>LIBRARY</span>
              <Heading as="h3">Comio</Heading>
              <p>
                A composable I/O library that abstracts reading and writing
                into irreducible primitives, inspired by the Turing machine.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Software Engineering"
      description="Software engineering articles and project notes by Robert Kim.">
      <HomepageHeader />
      <HomepageContent />
    </Layout>
  );
}
