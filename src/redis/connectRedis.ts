import * as redis from 'redis';

export class ConnectToRedis {

  private client: redis.RedisClientType<any, any, any>;
  private dbNumber: number;

  constructor(dbNumber: number) {
    this.dbNumber = dbNumber;
    this.client = redis.createClient({url:process.env.URLREDIS});
    this.setupConnectRedis();
  }

  private setupConnectRedis(): void {

    this.client.connect();
    this.client.select(this.dbNumber);
 
    this.client.on("error", (error) => {
        console.error(error);
    });
  }

  async set(key: string, value: string): Promise<string | null> {
    return await this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async quit(): Promise<void> {
    await this.client.quit();
  }

}