export {};

// Here we declare the members of the process.env object, so that we
// can use them in our application code in a type-safe manner.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE_NAME: string;
      KEYCLOAK_URL: string;
      KEYCLOAK_REALM: string;
      KEYCLOAK_CLIENT_ID: string;
      KEYCLOAK_CLIENT_ADMIN: string | undefined | "";
      KEYCLOAK_CLIENT_USER: string;
      KEYCLOAK_CLIENT_MUSCIAN: string | undefined | "";
      KEYCLOAK_SECRET: string;
    }
  }
}
