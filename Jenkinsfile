import groovy.json.JsonSlurperClassic 

pipeline {
    agent {
        label "agent"
    }

    environment {
        DOCKER_CRED = credentials("docker")
        K8S_SERVER = "https://192.168.39.236:8443"
        K8S_TOKEN = credentials("k8sToken")
    }

    tools {
        dockerTool "Docker"
    }

    stages {
        stage("Clean workspace") {
            steps {
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

                    def changedServices = [:]
                    services.each { srv ->
                        changedServices[srv] = changedFiles.contains("server/${srv}-service/") ? "true" : "false"
                    }

                    env.CHANGED_SERVICES = groovy.json.JsonOutput.toJson(changedServices)
                }
            }
        }

        stage("Detect changed k8s folder") {
            steps {
                script {
                    def kubernetes = ["api-gateway-service", "app-notification-service", "auth-service", "chat-service", "elasticsearch", "gig-service", "heartbeat", "kibana", "metricbeat", "mongodb", "mysql", "notification-service", "order-service", "rabbitmq", "redis", "review-service", "secrets", "user-service"]
                    def changedFiles = sh(script: 'git diff --name-only HEAD~1', returnStdout: true).trim()

                    def changedK8s = [:]
                    kubernetes.each { k8s ->
                        changedK8s[k8s] = changedFiles.contains("k8s/minikube/${k8s}/") ? "true" : "false"
                    }

                    env.CHANGED_K8S = groovy.json.JsonOutput.toJson(changedK8s)
                }
            }
        }

        stage("Build and push docker image") {
            steps {
                script {
                    def parallelStages = [:]
                    def changedServices = new groovy.json.JsonSlurperClassic().parseText(env.CHANGED_SERVICES)

                    changedServices.each { srv, changed ->
                        if (changed == "true") {
                            parallelStages[srv] = {
                                stage("Build and push ${srv} service") {
                                    steps {
                                        sh """
                                            cd server/${srv}-service/
                                            docker login -u ${DOCKER_CRED_USR} -p ${DOCKER_CRED_PSW}
                                            docker build -t ronasunil/jobber-${srv} .
                                            docker push ronasunil/jobber-${srv}
                                        """
                                    }
                                }
                            }
                        }
                    }

                    if (!parallelStages.isEmpty()) {
                        parallel parallelStages
                    }
                }
            }
        }

        stage("Deploy changes to k8s") {
            steps {
                script {
                    def changedK8s = new groovy.json.JsonSlurper().parseText(env.CHANGED_K8S)

                    changedK8s.each { k8s, changed ->
                        if (changed == "true") {
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


