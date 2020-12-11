# Api-Nest
- this is an api created with NestJs using TypeORM and Postgres

# install
- Run yarn install

- You have create your .env with the .env.example

- Informationa about connection database https://docs.nestjs.com/techniques/database

- You have replace the information ormconfig.json using the information of your database

```
{
    "type":"postgres", => your type can be Mysql, Oracle, Sql
    "host":"localhost",
    "port":"5432", => default postgres
    "username":"postgres",=> your username
    "password":"admin", => your password
    "database":"ideas", => you have create the database before run the project.
    "synchronize":true,
    "logging":true,
    "entities":["dist/**/*.entity{.ts,.js}"]
}
```
