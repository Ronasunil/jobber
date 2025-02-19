import groovy.transform.Field

@Field def changedServices = [:]
@Field def changedK8s = [:]

pipeline {
    agent {
        label "agent"
    }

    environment {
        DOCKER_CRED = credentials("docker")
        K8S_SERVER = "https://192.168.39.236:8443"
        K8S_TOKEN = credentials("k8sToken")
        NPM_TOKEN = credentials("jobberShared")
    }

    tools {
        dockerTool "Docker"
    }

    stages {
        stage("Clean workspace") {
            steps {
                script {
                    sh """
                    set +x  # Disable masking
                    echo "NPM_TOKEN is: ${NPM_TOKEN}"
                    set -x  # Re-enable masking
                       """
                }
                cleanWs()
            }
        }

        stage("Checkout code") {
            steps {
                git branch: 'main', url: 'https://github.com/Ronasunil/jobber'
            }
        }



        stage("Detect changed service") {
            steps {
                script {
                    def services = ["auth", "chat", "api-gateway", "app-notification", "gig", "notification", "order", "review", "user"]
                    def changedFiles = sh(script: 'git diff --name-only HEAD~1', returnStdout: true).trim()

                    services.each { srv ->
                        if (changedFiles.contains("server/${srv}-service/")) {
                            changedServices[srv] = true
                        }
                    }
                }
            }
        }

        stage("Detect changed k8s folder") {
            steps {
                script {
                    def kubernetes = ["api-gateway-service", "app-notification-service", "auth-service", "chat-service", "elasticsearch", "gig-service", "heartbeat", "kibana", "metricbeat", "mongodb", "mysql", "notification-service", "order-service", "rabbitmq", "redis", "review-service", "secrets", "user-service"]
                    def changedFiles = sh(script: 'git diff --name-only HEAD~1', returnStdout: true).trim()

                    kubernetes.each { k8s ->
                        if (changedFiles.contains("k8s/minikube/${k8s}/")) {
                            changedK8s[k8s] = true
                        }
                    }
                }
            }
        }



        stage("Build and push docker image") {
            steps {
                script {
                    def parallelStages = [:]

                    changedServices.each { srv, changed ->
                        if (changed) {

                                sh """
                                    cd server/${srv}-service/
                                    docker login -u ${DOCKER_CRED_USR} -p ${DOCKER_CRED_PSW}
                                    docker build --build-arg NPM_TOKEN=${NPM_TOKEN} -t ronasunil/jobber-${srv} .
                                    docker push ronasunil/jobber-${srv}
                                """
                        }
                    }

                }
            }
        }

        stage("Deploy changes to k8s") {
            steps {
                script {
                    changedK8s.each { k8s, changed ->
                        if (changed) {
                            sh """
                                cd k8s/minikube/${k8s}/
                                kubectl --insecure-skip-tls-verify --token=${K8S_TOKEN} --server=${K8S_SERVER} apply -f .
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                def name = sh(script: "git log -1 --pretty=format:'%an'", returnStdout: true).trim()
                def msg = "${name} just deployed a successful build ✅ More details: ${env.BUILD_URL}"
                slackSend(channel: '#jenkins', color: 'good', message: msg)
            }
        }
        failure {
            script {
                def name = sh(script: "git log -1 --pretty=format:'%an'", returnStdout: true).trim()
                def msg = "🚨 *Build Alert!* Uh-oh! ${name}'s latest build has failed ❌"
                slackSend(channel: '#jenkins', color: 'danger', message: msg)
            }
        }
    }
}
