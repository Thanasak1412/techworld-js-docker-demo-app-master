def gv

pipeline {
    agent any

    environment {
        NEW_VERSION = '1.3.0'
    }

    parameters{
        choice(name: 'DEPLOY_VERSION', choices: ['1.1.0', '1.1.1', '1.1.2'], description: 'Version to deploying')
        booleanParam(name: 'executeTest', defaultValue: true, description: 'Execute test job')
    }

    stages {
        stage('init') {
            steps{
                script {
                    gv = load 'script.groovy'
                }
            }
        }
        
        stage("build") {
            steps {
                script {
                    gv.buildApp()
                }
            }
        }

        stage("test") {
            when {
                expression {
                    params.executeTest
                }
            }
            
            steps {
                script {
                    gv.testApp()
                }
            }
        }

        stage("deploy") {
            steps {
                script {
                    gv.deployApp()
                }
            }
        }
    }
}