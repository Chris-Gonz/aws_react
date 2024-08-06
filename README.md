# AWS / REACT / JavaScript / JAVA / SPRING

---

---

## **Backend**

### Java 17

- Spring boot
  - Spring web
  - Lombok
- Web Server - Apache Tomcat

----

### [SpringBoot](https://spring.io/projects/spring-boot)

The backend uses SpringBoot to do all the heavy lifting. 
I use this framework heavily to save personal time and get up and running faster.
Another reason is the simplicity of the application I am building.
The framework provides the majority of the features I am implementing.  

This project will loosely follow an MVC architecture.

### [Maven](https://maven.apache.org/)

Notes: Maven is a project management tool. 
A quality of life improvement for developers of java.In this particular case, I added several **profiles**:

- Frontend-build - This will compile my front end and copy the target into the java resource directory.
  - To run the jar created by this build:
    ``` java -jar target/aws_react-0.0.1-SNAPSHOT.jar```
  
- Jib-push-to-Local - This profile uses jib and dockerized my java app and pushes an image to my local environment

- Jib-push-to-dockerHub - This profile uses jib to push an image to the remote repo, currently docker hub

```shell
Commands used to build front and back end to container: 

./mvnw clean install -P frontend-build -P jib-push-to-dockerhub -Dapp.image.tag=2

./mvnw clean install -P frontend-build -P jib-push-to-local -Dapp.image.tag=latest

```
  
- [FrontEnd-Maven-Plugin](https://github.com/eirslett/frontend-maven-plugin)
  - This plugin facilitates the integration of front-development tasks, such as JS
      'CSS' other front-end assets, into the Maven build lifecycle.

- [JIB](https://cloud.google.com/java/getting-started/jib)
  - Jib builds containers without using a Dockerfile or requiring a Docker installation. You can use Jib in the Jib plugins for Maven or Gradle, or you can use the Jib Java library.
  - Jib separates the dependencies into separate layers. Lowering the amount of data needed to move around.
  
## **Frontend**

- JavaScript
- React
- Bootstrap

---
Resume: Unfetch video.

What is UNFETCH doing for me? What is polyfill? 

## Cloud

### [AWS](https://aws.amazon.com/)

For this project, I created users and groups under my root account. 
This is over kill for my use, but its good practice to have and get hands on how to configure IAM roles. 
I used Identity Center as the service, which is different from IAM.

#### AWS Resource: Elastic BeanStalk

Using EB to deploy our docker web app. It will handle and create most of the common resources needed to deploy it. Resources like EC2 to run the app/server, RO

### [Docker-Compose](https://docs.docker.com/compose/)

Using docker compose here mainly for the ease of configuration.
Doing all in the yaml file instead of through docker cli.
Since we bundled the back and front-end, we will only define the backend service in the yaml file.

## **Database**

### [Postgresql](https://www.postgresql.org/)

The database used for this project will be postgresql. This will be a docker container. Creating a temp data folder that mounts to the postgres folder in /var

Note: Default database name is `postgres`


```shell

1 - create a folder to mount /var/lib/postgresql/data
2 - cd into that folder
3 - run following command:

MAC LINUX Users
docker run --name db -p 5432:5432 --network=db -v "$PWD:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=password -d postgres:alpine

WINDOWS Users
docker run --name db -p 5432:5432 --network=db -v "%cd%:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=password -d postgres:alpine
```

### [PSQL](https://www.postgresql.org/docs/7.0/app-psql.htm)

PSQL is a terminal-based front-end to Postgres. It enables you to type in queries interactively, issue them to Postgres, and see the query results.

For this project, we spin up a psql container when needed and discarded after use.
This is the only way to manage the db.

```shell
docker run -it --rm --network=db postgres:alpine psql -h db -U postgres
```

### AWS - RDS

This is the database to be used inside AWS. 
