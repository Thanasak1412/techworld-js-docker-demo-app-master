def buildApp() {
    echo 'building the application...'
    echo "building version ${NEW_VERSION}"
}

def testApp() {
    echo 'testing the application...'
}

def deployApp() {
    echo 'deploying the application...'
    echo "deploying version: ${params.DEPLOY_VERSION}"

    withCredentials([usernamePassword(credentialsId: 'server-user', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
        echo "Username: ${USERNAME}"
        echo "Password: ${PASSWORD}"
    }
}

return this