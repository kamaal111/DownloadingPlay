'use client';

import * as React from 'react';

import ServerClient from '@/clients/server';

import styles from './page.module.css';

const server = new ServerClient();

export default function Home() {
  React.useEffect(() => {
    server.health.ping().then((value) => {
      console.log('value.message', value.message);
    });
  }, []);

  return (
    <main className={styles.main}>
      <h1>Hello World!</h1>
    </main>
  );
}
