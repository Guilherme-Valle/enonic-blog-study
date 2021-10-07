# MYPROJECT

# Instructions

## Starting the project

Run the following command: `make`

**Do not start the container instance with `docker start <container-id>` command line, you must use `make`, otherwise the other app services won't be start properly.**

## Getting help with the other commands

Run the following command: `make help`

You should see something like this

```bash
$ make help
up                             Build the app container image (if it doesn't exists) and runs the containers
down                           Stop and remove the containers that was created by 'make up' command
access                         Run an interactive bash session on app container
install                        Runs 'npm install'
gulp                           Runs 'gulp'
```

# Accessing

## Local

Enonic -> http://localhost:8080
