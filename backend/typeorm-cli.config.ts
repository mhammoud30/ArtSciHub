import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'machammoud',
  password: 'pal3Sea99',
  database: 'artscihub',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
});
