FROM bellsoft/liberica-openjdk-alpine
ARG JAR_FILE=build/libs/tarotbom-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]