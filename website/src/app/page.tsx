'use client';

import * as React from 'react';
import FileSaver from 'file-saver';

import ServerClient from '@/clients/server';

import styles from './page.module.css';

const server = new ServerClient();

export default function Home() {
  const [downloading, setDownloading] = React.useState(false);

  async function withDownloading(action: () => Promise<unknown>) {
    setDownloading(true);
    await action();
    setDownloading(false);
  }

  async function downloadPDF() {
    await withDownloading(async () => {
      let response: Awaited<ReturnType<typeof server.download.pdf>>;
      try {
        response = await server.download.pdf();
      } catch (error) {
        console.error('error', error);
        return;
      }

      FileSaver.saveAs(response, 'bitcoin.pdf');
    });
  }

  return (
    <main className={styles.main}>
      <h1>Downloading stuff</h1>
      {downloading ? <p>Loading....</p> : null}
      <button
        type="button"
        onClick={(_event) => downloadPDF()}
        disabled={downloading}
      >
        Download PDF
      </button>
    </main>
  );
}
