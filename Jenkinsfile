pipeline {
    agent any

    environment {
        MONGODB_URI = 'mongodb+srv://papetuanarina:FMySwBDqf2O93rar@ip1.90y7ear.mongodb.net/?retryWrites=true'
        SLACK_WEBHOOK = 'https://hooks.slack.com/services/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'
        EMAIL_TO = 'papetua.narina@student.moringaschool.com'
        EMAIL_FROM = 'papetua.narina@student.moringaschool.com'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/Papsy-ops/PI1.git'
            }
        }
        stage('Verify MongoDB Connection') {
            steps {
                sh "mongosh '${env.MONGODB_URI}' --eval 'show dbs'"
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test &'
            }
        }
        stage('Deploy to Render') {
            steps {
                sh 'nohup node server.js > output.log 2>&1 &'
            }
        }
    }

    post {
        success {
            script {
                emailext subject: 'Deployment Successful',
                    body: "The deployment of the project was successful!",
                    to: "${env.EMAIL_TO}",
                    from: "${env.EMAIL_FROM}"

                // Send Slack notification on success
                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{
                    "text": "Deployment Successful! The app has been successfully deployed. \nBuild ID: ${env.BUILD_ID} \nBuild URL: ${env.BUILD_URL} \nView it at https://pi1-wtoa.onrender.com"
                }' \
                ${env.SLACK_WEBHOOK}
                """
            }
        }

        failure {
            script {
                emailext subject: 'Deployment Failed',
                    body: "The deployment of the project failed. Check Jenkins logs for details.",
                    to: "${env.EMAIL_TO}",
                    from: "${env.EMAIL_FROM}"

                // Send Slack notification on failure
                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{
                    "text": "Deployment Failed! Check Jenkins logs for details. \nBuild ID: ${env.BUILD_ID} \nBuild URL: ${env.BUILD_URL}"
                }' \
                ${env.SLACK_WEBHOOK}
                """
            }
        }
    }
}
