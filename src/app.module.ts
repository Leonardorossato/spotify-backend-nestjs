import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { KeycloakModule } from './keycloak/keycloak.module';

@Module({
  imports: [SongsModule, KeycloakModule]
})
export class AppModule {}
