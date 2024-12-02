import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const dbUrl = process.env.DATABASE_URL;

  let config = {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNC === 'true',
    autoLoadEntities: process.env.DATABASE_LOAD_ENTITIES === 'true',
  };

  if (dbUrl) {
    try {
      const url = new URL(dbUrl);
      config = {
        host: url.hostname,
        port: parseInt(url.port, 10) || 5432,
        username: url.username,
        password: url.password,
        name: url.pathname.slice(1), // Remove the leading '/'
        synchronize: process.env.DATABASE_SYNC === 'true',
        autoLoadEntities: process.env.DATABASE_LOAD_ENTITIES === 'true',
      };
    } catch (error) {
      console.error('Invalid DATABASE_URL format:', error);
    }
  }

  return config;
});
