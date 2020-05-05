pipeline {
    agent any
    stages {
        stage ('SNAPSHOT') {
            steps {

                withSonarQubeEnv('Sonarqube') {
                    sh 'mvn clean install -Dmaven.test.failure.ignore=true -Dliquibase.should.run=false sonar:sonar'
                }

                timeout(time: 1, unit: 'HOURS') {
                    script {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            mail bcc: '', body: 'Tests in SonarQube are less than 80%', cc: '', from: '', replyTo: '', subject: 'SNAPSHOT FAILED', to: 'uladzislau_biadrytski@epam.com'
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: '**/surefire-reports/*.xml'
                    recordIssues(tools: [checkStyle(), pmdParser(), spotBugs(useRankAsPriority: true)])
                }
                failure {
                    script {
                        mail bcc: '', body: 'Snapshot stage failed.', cc: '', from: '', replyTo: '', subject: 'SNAPSHOT FAILED', to: 'uladzislau_biadrytski@epam.com'
                    }
                }
            }
        }

        stage('RELEASE') {
            steps {
                script {

                    def ret = sh(script: 'curl -u admin:password123  -s -o /dev/null -w "%{http_code}" http://35.239.53.104:8081/artifactory/api/storage/libs-release-local/org/example/webgame/1.01/webgame-1.01.pom', returnStdout: true)
                    if (ret == "200") {
                        currentBuild.result = 'FAILURE'
                        error "release failed"
                    }

                    def artServer = Artifactory.server('ARTIFACTORY_SERVER')
                    def rtMaven = Artifactory.newMavenBuild()
                    rtMaven.tool = 'Maven-3.6'
                    def buildInfo = rtMaven.run pom: 'pom.xml',  goals: 'clean install -Dmaven.test.skip=true -Dliquibase.should.run=false'

                    rtMaven.resolver server: artServer, releaseRepo: 'libs-release', snapshotRepo: 'libs-snapshot'
                    rtMaven.deployer server: artServer, releaseRepo: 'libs-release-local', snapshotRepo: 'libs-snapshot-local'

                    artServer.publishBuildInfo buildInfo
                    rtMaven.deployer.deployArtifacts buildInfo
                }
            }
            post {
                failure {
                    script {
                        mail bcc: '', body: 'Release stage failed.', cc: '', from: '', replyTo: '', subject: 'RELEASE FAILED', to: 'uladzislau_biadrytski@epam.com'
                    }
                }
            }
        }

        stage('DEPLOY') {
            steps {
                script {
                    sh 'mvn clean install -Dmaven.test.skip=true -Dliquibase.should.run=false'
                    deploy adapters: [tomcat8(credentialsId: 'cd34afab-d0bd-4e08-949e-d2f2ebf703ef', path: '', url: 'http://tomcat:8080')], contextPath: null, war: 'web/target/*.war'
                    sh 'sleep 5'

                    def statusWebApp = sh(script: 'curl -s -o /dev/null -w "%{http_code}" http://35.239.53.104:8087/web-1.01/', returnStdout: true)
                    if (statusWebApp != "200") {
                        currentBuild.result = 'FAILURE'
                        error "deploy failed"
                    }
                }
            }
            post {
                failure {
                    script {
                        mail bcc: '', body: 'Deploy stage failed.', cc: '', from: '', replyTo: '', subject: 'DEPLOY FAILED', to: 'uladzislau_biadrytski@epam.com'
                    }
                }
            }
        }
    }
}