import { Injectable } from '@nestjs/common';
import { cleanUp } from '../../shared/constants';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron('0 3 * * * *', { timeZone: 'Europe/Minsk' })
  cleanUpImages() {
    cleanUp();
  }
}
