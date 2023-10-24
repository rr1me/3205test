import { Injectable } from '@nestjs/common';
import { IsDefined } from 'class-validator';

export type AvailableAccount = { email: string, number: string };

@Injectable()
export class AppService {
  private readonly availableAccounts: AvailableAccount[];

  constructor() {
    this.availableAccounts = [{
      email: 'jim@gmail.com',
      number: '221122'
    },
    {
      email: 'jam@gmail.com',
      number: '830347'
    },
    {
      email: 'john@gmail.com',
      number: '221122'
    },
    {
      email: 'jams@gmail.com',
      number: '349425'
    },
    {
      email: 'jams@gmail.com',
      number: '141424'
    },
    {
      email: 'jill@gmail.com',
      number: '822287'
    },
    {
      email: 'jill@gmail.com',
      number: '822286'
    }];
  }

  async getAccounts(b: DTO): Promise<AvailableAccount[]>{
    const predicate = b.number ?
      (x: AvailableAccount) => x.email === b.email && x.number === b.number
      :
      (x: AvailableAccount) => x.email === b.email;
    await new Promise(r => setTimeout(r, 5000));
    return this.availableAccounts.filter(predicate);
  }
}

export class DTO {
  @IsDefined() email: string;
  number?: string;
}
