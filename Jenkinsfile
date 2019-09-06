pipeline {
  agent any

  stages {
    stage("Publish to NPM") {
      when {
        branch 'master'
      }

      environment { NPM_TOKEN = credentials('npm-token') }

      steps {
        sh "echo \"//registry.npmjs.org/:_authToken=\${NPM_TOKEN}\" > .npmrc"
        sh "npm publish"
      }
    }

    post {
      always {
        sh "rm -f .npmrc"
      }
    }
  }
}
