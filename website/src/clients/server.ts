import path from 'path';

const BASE_URL = 'http://127.0.0.1:8000';

class ServerClient {
  health: HealthClient;

  constructor() {
    this.health = new HealthClient();
  }
}

class HealthClient {
  constructor() {}

  async ping(): Promise<{ message: 'pong' }> {
    const url = this.makeURL({ path: 'ping' });
    const response = await fetch(url.toString());
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  private makeURL({ path: urlPath }: { path: string }) {
    const url = new URL(BASE_URL);
    url.pathname = path.join('health', urlPath);
    return url;
  }
}

export default ServerClient;
