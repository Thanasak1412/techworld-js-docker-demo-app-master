pipeline {
    agent any

    environment {
        NEW_VERSION = '1.3.0'
    }

    tools {
        nodejs 'NodeJS-10.0.0'
    }

    stages {
        stage("build") {
            steps {
                echo 'building the application...'
                echo "building version ${NEW_VERSION}"
                sh 'yarn build'
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

                withCredentials([usernamePassword(credentialsId: 'server-user', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    echo "Username: ${USERNAME}"
                    echo "Password: ${PASSWORD}"
                }
            }
        }
    }
}