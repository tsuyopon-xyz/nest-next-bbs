/* 参考: Docker Compose Postgres Multiple Database
https://onexlab-io.medium.com/docker-compose-postgres-multiple-database-bbc0816db603 */
CREATE USER test WITH PASSWORD 'test' CREATEDB;
CREATE DATABASE test
    WITH
    OWNER = test
    ENCODING = 'UTF8'
    LC_COLLATE = 'ja_JP.utf8'
    LC_CTYPE = 'ja_JP.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;