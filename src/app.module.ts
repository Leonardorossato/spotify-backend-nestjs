import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { KeycloakService } from './keycloak/keycloak.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    SongsModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakService,
      imports: [KeycloakModule],
    }),
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
