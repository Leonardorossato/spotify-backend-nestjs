import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { KeycloakConfigService } from './keycloak/keycloak.service';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RequestContextModule } from 'nestjs-request-context';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true}),
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [KeycloakModule, RequestContextModule],
    }),
    AuthModule,
    PlaylistModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
