import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import _ from 'lodash';
import { Logger } from '../../common/logger/logger';
import { InjectDataSource } from '@nestjs/typeorm';
import { writeFile } from '../../services/inFile';
import moment from 'moment';

@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource()
    private userRepository: UsersRepository,
    private logger: Logger
  ) {}

  async singleInsert(num = 1) {
    this.logger.log(`Start Single Insert`);
    const start = moment();
    for (let index = 1; index <= num; index++) {
      const query = `INSERT INTO Users2  VALUES (${index}, 'ThanhLD${index}', 'thanhld${index}@vitalify.asia'); `;
      await this.userRepository.query(query);
    }
    const end = moment();
    this.logger.log(`End Single Insert in: ${end.diff(start, 'milliseconds')}`);
  }

  async batchInsert(num = 1) {
    let query = 'INSERT INTO Users2  VALUES';
    for (let index = 1; index <= num; index++) {
      if (index > 1) {
        query += ',';
      }
      query += ` (${index}, 'ThanhLD${index}', 'thanhld${index}@vitalify.asia')`;
    }
    this.logger.log(`Start Batch Insert`);
    const start = moment();
    await this.userRepository.query(query);
    const end = moment();
    this.logger.log(`End Batch Insert in: ${end.diff(start, 'milliseconds')}`);
  }

  async loadInsert(num = 1) {
    const data = [];
    for (let index = 1; index <= num; index++) {
      data.push({
        id: index,
        userName: `ThanhLD${index}`,
        email: `thanhld${index}@vitalify.asia`,
      });
    }
    const filePath = await writeFile('step', 1, data);
    this.logger.log(`Start Load Insert`);
    const start = moment();
    const query = `LOAD DATA LOCAL INFILE '${filePath}'
                    INTO TABLE minpokei.Users2
                    FIELDS TERMINATED BY ';'  ENCLOSED BY ''
                    LINES TERMINATED BY '\n' (id,userName,email);`;

    this.logger.log(`Start Single Insert`);
    await this.userRepository.query(query);
    const end = moment();
    this.logger.log(`End Load Insert in: ${end.diff(start, 'milliseconds')}`);
  }
}
