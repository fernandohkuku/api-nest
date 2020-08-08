# api-nest
this is an api created with NestJs using TypeORM and Postgres

you need postgres, but soon i gonna add Docker
# install
run yarn install

You have create your .env with the .env.example

You have replace the information ormconfig.json using the information of your database

informationa about connection database https://docs.nestjs.com/techniques/database

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
