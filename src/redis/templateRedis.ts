
import { ConnectToRedis } from './connectRedis';

export class GetTemplate extends ConnectToRedis {

  private changeStr: {[key: string]: string} = {};

  /**
   * @dbNumber
   * parametro para seleccao do DB do redis
   */
  constructor(dbNumber: number){
    super(dbNumber);
  };

  setArgsChanges(key: string, value: string): void {
    this.changeStr[key] = value;
  }

  private async setAttrChange(template: string): Promise<string> {
    let strTemplate: string = await super.get(template) as string;

    for(const key in this.changeStr)
      strTemplate = strTemplate.replace(new RegExp(`${key}`, 'g'), this.changeStr[key]);

    super.quit();
    return strTemplate;
  }

  async getTemplateToJSON(template: string): Promise<object> {
    return JSON.parse(await this.setAttrChange(template));
  }
}