pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')
    }
    triggers {
        pollSCM('*/5 * * * *')
    }
    stages {
        stage('Checkout') {
            agent any
            steps {
                checkout scm
            }
        }
        stage('Init') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Build') {
            steps {
                
                sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/api-gateway:$BUILD_ID -f api-gateway/Dockerfile ./api-gateway'
                sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/books-service:$BUILD_ID -f books-service/Dockerfile .'
                sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/customers-service:$BUILD_ID -f customers-service/Dockerfile .'
                sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/orders-service:$BUILD_ID -f orders-service/Dockerfile .'
            }
        }

        stage('Debug') {
            steps {
                sh 'ls -la'
            }
        }

        stage('Test') {
            steps {
                
                    
                    //sh 'npm test -f api-gateway/test/server.test.js'
                    //sh 'npm test -f books-service/test/server.test.js'
                    //sh 'npm test -f customers-service/test/server.test.js'
                    //sh 'npm test -f orders-service/test/server.test.js'
                }
                
            }

        stage('Deliver') {
            steps {
                sh 'docker push $DOCKERHUB_CREDENTIALS_USR/api-gateway:$BUILD_ID'
                sh 'docker push $DOCKERHUB_CREDENTIALS_USR/books-service:$BUILD_ID'
                sh 'docker push $DOCKERHUB_CREDENTIALS_USR/customers-service:$BUILD_ID'
                sh 'docker push $DOCKERHUB_CREDENTIALS_USR/orders-service:$BUILD_ID'
            }
        }
        stage('Cleanup') {
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
