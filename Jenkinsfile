pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/Papsy-ops/PI1.git'
            }
        }
        stage('Verify MongoDB Connection') {
            steps {
                sh 'mongosh "mongodb+srv://papetuanarina:FMySwBDqf2O93rar@ip1.90y7ear.mongodb.net/?retryWrites=true" --eval "show dbs"'
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
                    to: 'papetua.narina@student.moringaschool.com',
                    from: 'papetua.narina@student.moringaschool.com'

                // Send Slack notification on success
                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{
                    "text": "Deployment Successful! The app has been successfully deployed. \nBuild ID: ${env.BUILD_ID} \nBuild URL: ${env.BUILD_URL} \nView it at https://pi1-wtoa.onrender.com"
                }' \
                https://hooks.slack.com/services/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
                """
            }
        }

        failure {
            script {
                emailext subject: 'Deployment Failed',
                    body: "The deployment of the project failed. Check Jenkins logs for details.",
                    to: 'papetua.narina@student.moringaschool.com',
                    from: 'papetua.narina@student.moringaschool.com'

                // Send Slack notification on failure
                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{
                    "text": "Deployment Failed! Check Jenkins logs for details. \nBuild ID: ${env.BUILD_ID} \nBuild URL: ${env.BUILD_URL}"
                }' \
                https://hooks.slack.com/services/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
                """
            }
        }
    }
}
