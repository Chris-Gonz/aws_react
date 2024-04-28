# AWS / REACT / JavaScript / JAVA / SPRING

## **Backend**

### Java 17

- Spring boot
  - Spring web
  - Lombok
- Web Server - Apache Tomcat

### [Maven](https://maven.apache.org/)
  
- [FrontEnd-Maven-Plugin](https://github.com/eirslett/frontend-maven-plugin)

  - This plugin facilitates the integration of front-development tasks, such as JS
      ,CSS other front-end assets, into the Maven build lifecycle.

  - [JIB](https://cloud.google.com/java/getting-started/jib)
    - Jib builds containers without using a Dockerfile or requiring a Docker installation. You can use Jib in the Jib plugins for Maven or Gradle, or you can use the Jib Java library.
      - Jib separates the dependencies into a separate layers. Lowering the amount of data needed to move around.

## **Frontend**

- JavaScript
- React
- Bootstrap

---
Resume: Unfetch video.

What is UNFETCH doing for me? What is polyfill?

## Cloud

### [AWS](https://aws.amazon.com/)

For this project I created users and groups under my root account. This is overkill for my use but its good practice to have and get hands on how to configure IAM roles. I used Identity Center as the service, which is different from IAM.

#### AWS Resource: Elastic BeanStalk

Using EB to deploy our docker web app. It will handle and create most of the common resources needed to deploy it. Resources like EC2 to run the app/server, RO

### [Docker-Compose](https://docs.docker.com/compose/)

Using docker compose here mainly for the ease of  configuration. DOing it all in the yaml file instead of through docker cli.
Since we bundled the back and front end we will only define the backend service in the yaml file.
