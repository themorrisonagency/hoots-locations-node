declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REDIS_URL: string;
      PORT: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
      RUN_MIGRATIONS: string;
      PERCH_UPLOAD_PATH: string;
      PERCH_UPLOAD_PATH_PUBLIC: string;
      YEXT_API_KEY: string;
    }
  }
}

export {}
