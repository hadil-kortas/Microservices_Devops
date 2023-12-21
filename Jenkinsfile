pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')
    }
    triggers {
        pollSCM('*/5 * * * *')
    }
    stages {
        stage('Checkout'){
        agent any
        steps{
            checkout scm
        }
        }
        stage('Init'){
        steps{
            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        }
        }
        stage('Build'){
        steps {
            sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/api-gateway:$BUILD_ID .'
            sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/books-server:$BUILD_ID .'
            sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/customers-server:$BUILD_ID .'
            sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/orders-service:$BUILD_ID .'
        }
        }
        stage('Deliver'){
        steps {
            sh 'docker push $DOCKERHUB_CREDENTIALS_USR/api-gateway:$BUILD_ID'
            sh 'docker push $DOCKERHUB_CREDENTIALS_USR/books-server:$BUILD_ID'
            sh 'docker push $DOCKERHUB_CREDENTIALS_USR/customers-server:$BUILD_ID'
            sh 'docker push $DOCKERHUB_CREDENTIALS_USR/orders-server:$BUILD_ID'
        }
        }
        stage('Cleanup'){
        steps {
            sh 'docker rmi $DOCKERHUB_CREDENTIALS_USR/api-gateway:$BUILD_ID'
            sh 'docker rmi $DOCKERHUB_CREDENTIALS_USR/books-service:$BUILD_ID'
            sh 'docker rmi $DOCKERHUB_CREDENTIALS_USR/customers-service:$BUILD_ID'
            sh 'docker rmi $DOCKERHUB_CREDENTIALS_USR/orders-service:$BUILD_ID'
            sh 'docker logout'
        }
        }
}
}
