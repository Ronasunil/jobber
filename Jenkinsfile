pipeline{
    agent{
        label "agent"
    }

    environment {
        DOCKER_CRED = credentials("docker")

    }

    stages{
        stage("Clean workspace") {
            steps{
                cleanWs()
            }
        }

        stage("Checkout code") {
            steps{
                git branch: 'main', url: 'https://github.com/Ronasunil/jobber'
            }
           
        }

        stage("Detect changed service") {
            steps{
                script {
                    def services = ["auth", "chat", "api-gateway", "app-notification", "gig", "notification", "order", "review", "user"]
                    def changedFiles = sh(script: 'git diff --name-only HEAD~1', returnStdout: true).trim()

                    services.each{srv -> 
                       env[srv.toUpperCase()] = changedFiles.contains("server/${srv}-service/") ? "true" : "false"
                    }
                }
            }
        }

        stage("Detect changed k8s folder") {
            steps{
                scripts {
                    // k8s/minikube/monitors/heartbeat.yml
                    def kubernetes = ["api-gateway-service", "app-notification-service", "auth-service", "chat-service", "elasticsearch", "gig-service", "heartbeat", "kibana", "metricbeat", "mongodb", "mysql", "notification-service", "order-service", "rabbitmq", "redis", "review-service", "secrets", "user-service"];
                    def changedFiles = sh(script: 'git diff --name-only ~HEAD-1', returnStdout: true).trim()

                    kubernetes.each{k8s ->
                        env[k8s.toUpperCase()] =  changedFiles.contains("k8s/minikube/${k8s}/") ? "true" : "false"
                    }
                    
                }
            }
        }

        stage("Build and push docker image") {
                steps{
                    script {
                        def parallelStages = [:]
                        def services = ["auth", "chat", "api-gateway", "app-notification", "gig", "notification", "order", "review", "user"]

                        services.each{srv ->
                            if(env[srv.toUpperCase()] == "true") {
                                parallelStages[srv] = {
                                    stage("Build and push ${srv} service") {
                                        steps{
                                            sh """cd server/${srv}-service/
                                                  docker login -u ${DOCKER_CRED_USR} -password ${DOCKER_CRED_PSW}
                                                  docker build -t ronasunil/jobber-${srv} .
                                                  docker push ronasunil/jobber-${srv}   
                                                """                                       
                                        }
                                    }
                                }
                            }
                        }

                        if(!parallelStages.isEmpty()) {
                            parallel parallelStages
                        }
                    }
                }    

        }

        stage("Deploy changes to k8s service") {
            steps{
                script{
                    def services = ["auth", "chat", "api-gateway", "gig", "notification", "order", "review", "user"]

                    services.each{srv ->
                        if(env[srv.toUpperCase()] === "true") {
                            sh """ 
                                cd k8s/minikube/${srv}
                                kubectl apply -f .
                                """
                        }
                    }
                }
                

            }
        }

        stage("Deploy changes to k8s statefulSet, deployments, services and others") {
            steps{
def services = ["auth", "chat", "api-gateway", "gig", "notification", "order", "review", "user"]
                script{
                    def kubernetesServices = ["api-gateway-service", "app-notification-service", "auth-service", "chat-service", "elasticsearch", "gig-service", "heartbeat", "kibana", "metricbeat", "mongodb", "mysql", "notification-service", "order-service", "rabbitmq", "redis", "review-service", "secrets", "user-service"];

                    kubernetesServices.each{k8s -> 
                        if(env[statefulSet.toUpperCase()] == "true") {  
                                sh """ 
                                    cd  k8s/minikube/${k8s}/
                                    kubectl apply -f .
                                    """
                        }
                    }
                }

            }
        }
    }
}





