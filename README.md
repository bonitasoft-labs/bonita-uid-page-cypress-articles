# Bonita UI Designer page cypress test

This repository contains a page that lets you create a new user as well as tests for that page.

# Build

## Requirements

* Java 8
* Git
* UI Designer version 1.11.38 is used to build the pages. It must be installed in your local maven repository prior to building bonita-web-pages

To install UI Designer version 1.11.38:
* Clone the repository: git clone https://github.com/bonitasoft/bonita-ui-designer
* Fetch all the branches and tags: git fetch --all --tags
* Checkout the tag: git checkout tags/1.11.38 -b 1.11.38-branch
* Build UI Designer: ./mvnw clean install on Linux or ./mvnw.bat clean install on Windows
  
## Gradle Tasks

For each gradlew command that follows, use gradlew.bat if you are using Windows

### Build artifacts

``./gradlew build``

### Build artifacts and test them

``./gradlew clean build runIntegrationTests``

### UI Designer pages development

You can start a UI Designer development environment using

``./gradlew runUID``

project property can specify where bonita is located and the credentials to log in with.

``./gradlew runUID -PbonitaUrl=http://localhost:8080 -PbonitaUser=walter.bates -PbonitaPassword=bpm``
