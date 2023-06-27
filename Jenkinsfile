pipeline {
    agent any
    
    environment {
        GIT_URL = "https://github.com/tteog-ip/app-front"
        BuildNumber = "${currentBuild.number}"
    }

    stages {
        stage('Pull') {
            steps {
                git url: "${GIT_URL}", branch: "master", poll: true, changelog: true
            }
        }
        
        stage('AWS Credentials') {
            steps {
                withAWS(credentials: 'AWS-KEY', region: 'ap-northeast-2') {
                    sh 'aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 728156710202.dkr.ecr.ap-northeast-2.amazonaws.com/app-front'
                }
            }
        }

        stage('Build') {
            steps {
                sh 'docker system prune -f && docker build --force-rm --no-cache --tag 728156710202.dkr.ecr.ap-northeast-2.amazonaws.com/app-front:v$BuildNumber .'
            }
        }
    
        stage('Push'){
            steps{
                sh 'docker push 728156710202.dkr.ecr.ap-northeast-2.amazonaws.com/app-front:v$BuildNumber'
            }
        }
        
        stage('Manifest Update'){
            steps{
                git branch: 'master', url: 'https://github.com/tteog-ip/app-argocd'
                dir('front') {
                  sh 'sed -i "s/image:.*$/image: 728156710202.dkr.ecr.ap-northeast-2.amazonaws.com\\/app-front:v$BuildNumber/g" deployment.yaml'
                  sh 'git add -u'
                  sh 'git commit -m "Update Image Tag - v$BuildNumber"'
                  withCredentials([gitUsernamePassword(credentialsId: 'github-token-cykim', gitToolName: 'Default')]) {
                      sh 'git push origin master'
                  }
                }
            }
        }
    }
}
