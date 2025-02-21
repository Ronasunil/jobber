import groovy.transform.Field

@Field def changedServices = [:]
@Field def changedK8s = [:]
@Field def envUrls = [:]

pipeline {
    agent {
        label "agent"
    }

    environment {
        DOCKER_CRED = credentials("docker")
        K8S_SERVER = "https://192.168.39.166:8443"
        K8S_TOKEN = credentials("k8sToken")
        NPM_TOKEN = credentials("jobberShared")
        NOTIFICATION_ENV_TOKEN = credentials("notificationEnv")
        REVIEW_ENV_TOKEN = credentials("reviewEnv")
        GATEWAY_ENV_TOKEN = credentials("gatewayEnv")
        USER_TOKEN = credentials("userEnv")
        APP_NOTIFICATION_TOKEN = credentials("appNotifyEnv")
        AUTH_ENV_TOKEN = credentials("authEnv")
        ORDER_ENV_TOKEN = credentials("orderEnv")
        GIG_ENV_TOKEN = credentials("gigEnv")
        CHAT_ENV_TOKEN = crednetials("chatEnv")
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

        stage("Setup env variables") {
            //  All these links will remain valid until February 20, 2026
            envUrls = [
                "notification": "https://yzfzwmrgblmtnpeqaxnk.supabase.co/storage/v1/object/sign/env/config-notification.env?token=$NOTIFICATION_ENV_TOKEN",
                "gig" : "https://yzfzwmrgblmtnpeqaxnk.supabase.co/storage/v1/object/sign/env/config-gig.env?token=$GIG_ENV_TOKEN",
                "chat" : "https://yzfzwmrgblmtnpeqaxnk.supabase.co/storage/v1/object/sign/env/config-chat.env?token=$CHAT_ENV_TOKEN",
                "order" : "https://yzfzwmrgblmtnpeqaxnk.supabase.co/storage/v1/object/sign/env/config-order.env?token=$ORDER_ENV_TOKEN",
                "app-notification" : "https://yzfzwmrgblmtnpeqaxnk.supabase.co/storage/v1/object/sign/env/config-app-notify.env?token=$APP_NOTIFICATION_TOKEN",
                "auth" : "https://yzfzwmrgblmtnpeqaxnk.supabase.co/storage/v1/object/sign/env/config-auth.env?token=$AUTH_ENV_TOKEN",
                "api-gateway" :"https://yzfzwmrgblmtnpeqaxnk.supabase.co/storage/v1/object/sign/env/config-gateway.env?token=$GATEWAY_ENV_TOKEN",
                "review" : "https://yzfzwmrgblmtnpeqaxnk.supabase.co/storage/v1/object/sign/env/config-review.env?token=$GATEWAY_ENV_TOKEN"
                "user" : "https://yzfzwmrgblmtnpeqaxnk.supabase.co/storage/v1/object/sign/env/config-user.env?token=$USER_TOKEN"

            ]
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
                                    cd server/${srv}-service/src
                                    curl ${envUrls[srv]} > config.env
                                    ls
                                    cd ..
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

                    changedServices.each{srv, changed -> 
                        if(changed) {
                            def deploymentName = srv == "app-notification" ? jobber-notify : jobber-${srv}
                            sh "kubectl  --insecure-skip-tls-verify --token=${K8S_TOKEN} --server=${K8S_SERVER} rollout restart deployment ${deploymentName}"
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
