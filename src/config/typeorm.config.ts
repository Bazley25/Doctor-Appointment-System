import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

export default class TypeOrmConfig {
  static getOrmConfig(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: config.get('DB_HOST') || 'localhost',
      port: config.get('DB_PORT') || 3306,
      username: config.get('DB_USERNAME') || 'root',
      password: config.get('DB_PASSWORD') || '',
      database: config.get('DB_DATABASE') || 'petsmart',
      entities: [User],
      synchronize: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(config),
  inject: [ConfigService],
};
