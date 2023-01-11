import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

export const mongoAsyncConnection: MongooseModuleAsyncOptions = {
  useFactory: async (config: ConfigService): Promise<MongooseModuleOptions> => {
    return {
      uri: config.get('MONGO_URL'),
    };
  },
  inject: [ConfigService],
};
