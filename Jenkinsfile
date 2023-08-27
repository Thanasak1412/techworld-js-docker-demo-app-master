pipeline {
    agent any

    environment {
        NEW_VERSION = '1.3.0'
    }

    parameters{
        choice("VERSION", ['1.1.0', '1.1.1', '1.1.2'], description: '')
        booleanParam(name: 'executeTest', defaultValue: true, description: '')
    }

    stages {
        stage("build") {
            steps {
                echo 'building the application...'
                echo "building version ${NEW_VERSION}"
            }
        }

        stage("test") {
            when {
                expression {
                    params.executeTest
                }
            }
            
            steps {
                echo 'testing the application...'
            }
        }

        stage("deploy") {
            steps {
                echo 'deploying the application...'
                echo "deploying version: ${params.VERSION}"

                withCredentials([usernamePassword(credentialsId: 'server-user', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    echo "Username: ${USERNAME}"
                    echo "Password: ${PASSWORD}"
                }

            }
        }
    }
}