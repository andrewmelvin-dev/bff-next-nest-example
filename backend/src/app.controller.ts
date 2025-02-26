import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { UAParser } from 'ua-parser-js';
import { transactions } from './data/transactions';

@Controller()
export class AppController {
  private parser: UAParser;
  
  constructor(private readonly appService: AppService) {
    this.parser = new UAParser();
  }

  @Get()
  getHelloWorld(): string {
    return this.appService.getHelloWorld();
  }

  @Get('transactions')
  getTransactions(@Headers() headers: Record<string, string>) {
    this.parser.setUA(headers['x-custom-user-agent'] || headers['user-agent']);

    // If the device is mobile then drop the description from the transaction data
    if (this.parser.getResult()?.device?.type === 'mobile') {
      return transactions.map(transaction => ({
        ...transaction,
        amount: Number(transaction.amount),
        description: undefined
      }));
    }

    // Otherwise return the full set of data
    return transactions.map(transaction => ({
      ...transaction,
      amount: Number(transaction.amount)
    }));
  }
}
