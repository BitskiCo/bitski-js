pipeline {
    agent { label 'nodejs-8-chrome' }
    options {
        timeout(time: 5, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    environment {
        COVERAGE = 'true'
        REPORTER = 'xunit'
        DISABLE_CHROME_SANDBOX = 'true'
    }
    stages {
        stage("Test") {
            steps {
                sh "npm install"
                sh "npm run lint"
                sh "npm run test:ci"
            }
        }
    }
    post {
        always {
          junit 'junit.xml'
          step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/cobertura-coverage.xml'])
        }
    }
}
