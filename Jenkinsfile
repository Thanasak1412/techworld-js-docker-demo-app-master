pipeline {
    agent any

    environment {
        NEW_VERSION = '1.3.0'
    }

    stages {
        stage("build") {
            steps {
                echo 'building the application...'
                echo "building version ${NEW_VERSION}"
            }
        }

        stage("test") {
            steps {
                echo 'testing the application...'
            }
        }

        stage("deploy") {
            steps {
                echo 'deploying the application...'

                withCredentials([usernamePassword(credentials: 'js-demo-jenkins', usernameVariable: 'USER', passwordVariable: 'PWD')]) {
                    echo "executing some command user: ${USER} password: ${PWD}"
                }
            }
        }
    }
}