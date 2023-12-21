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
            steps {
                echo "Récupération du code source"
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    echo "Navigate to the api-gateway directory and start the server"
                    dir('api-gateway') {
                        sh 'npm install'
                        sh 'node server.js &'
                    }

                    echo "Navigate to the books-service directory and start the server"
                    dir('books-service') {
                        sh 'npm install'
                        sh 'node server.js &'
                    }

                    echo "Navigate to the customers-service directory and start the server"
                    dir('customers-service') {
                        sh 'npm install'
                        sh 'node server.js &'
                    }

                    echo "Navigate to the orders-service directory and start the server"
                    dir('orders-service') {
                        sh 'npm install'
                        sh 'node server.js &'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo "Stopping background processes"
                    sh 'pkill -f "node server.js"'
                }
            }
        }
    }
}
