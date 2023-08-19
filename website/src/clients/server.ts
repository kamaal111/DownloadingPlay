import path from 'path';

const BASE_URL = 'http://127.0.0.1:8000';

class ServerClient {
  health: HealthClient;
  download: DownloadClient;

  constructor() {
    this.health = new HealthClient();
    this.download = new DownloadClient();
  }
}

class ServerSubClient {
  protected path: string;

  constructor(path: string) {
    this.path = path;
  }

  protected async requestJSON({ path }: { path: string }) {
    const response = await this.request({ path });
    const json = await response.json();
    return json;
  }

  protected async requestBlob({ path }: { path: string }) {
    const response = await this.request({ path });
    const blob = await response.blob();
    return blob;
  }

  private makeURL({ path: urlPath }: { path: string }) {
    const url = new URL(BASE_URL);
    url.pathname = path.join(this.path, urlPath);
    return url;
  }

  private async request({ path }: { path: string }) {
    const url = this.makeURL({ path });
    const response = await fetch(url.toString());
    return response;
  }
}

class DownloadClient extends ServerSubClient {
  constructor() {
    super('download');
  }

  async pdf() {
    return this.requestBlob({ path: 'pdf' });
  }
}

class HealthClient extends ServerSubClient {
  constructor() {
    super('health');
  }

  async ping(): Promise<{ message: 'pong' }> {
    return this.requestJSON({ path: 'ping' });
  }
}

export default ServerClient;
