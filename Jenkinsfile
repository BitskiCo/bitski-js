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
                sh "./node_modules/lerna/cli.js bootstrap"
                sh "npm run lint"
                sh "npm run test:ci"
            }
        }
    }
    post {
        always {
          junit 'packages/browser/junit.xml'
          junit 'packages/provider/junit.xml'
          step([$class: 'CoberturaPublisher', coberturaReportFile: 'packages/browser/coverage/cobertura-coverage.xml'])
          step([$class: 'CoberturaPublisher', coberturaReportFile: 'packages/provider/coverage/cobertura-coverage.xml'])
        }
    }
}
