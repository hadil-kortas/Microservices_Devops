pipeline {
    agent any
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
                        sh 'npm start &'
                    }

                    echo "Navigate to the books-service directory and start the server"
                    dir('books-service') {
                        sh 'npm install'
                        sh 'npm start &'
                    }

                    echo "Navigate to the customers-service directory and start the server"
                    dir('customers-service') {
                        sh 'npm install'
                        sh 'npm start &'
                    }

                    echo "Navigate to the orders-service directory and start the server"
                    dir('orders-service') {
                        sh 'npm install'
                        sh 'npm start &'
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
                script {
                    echo "Building and pushing Docker images"
                    dir('api-gateway') {
                        sh 'docker build -t my-registry/api-gateway .'
                        sh 'docker push my-registry/api-gateway'
                    }
                    dir('books-service') {
                        sh 'docker build -t my-registry/books-service .'
                        sh 'docker push my-registry/books-service'
                    }
                    dir('customers-service') {
                        sh 'docker build -t my-registry/customers-service .'
                        sh 'docker push my-registry/customers-service'
                    }
                    dir('orders-service') {
                        sh 'docker build -t my-registry/orders-service .'
                        sh 'docker push my-registry/orders-service'
                    }



                }


            }
        }
    }
}
