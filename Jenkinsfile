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
                echo "Installation des dépendances"
                sh 'npm install'
                echo "Build du projet"
                sh 'npm run build'
                echo "Exécution des tests"
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo "Déploiement du projet"
      
            }
        }
    }
}
