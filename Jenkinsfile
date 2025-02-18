pipeline{
    agent{
        label "agent"
    }

    environment {
        DOCKER_CRED = credentials("docker")
        K8S_SERVER = "https://192.168.39.236:8443" 
        K8S_TOKEN = credentials("k8sToken")

    }

    tools{
        docker "Docker"
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
                script {
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

        stage("Deploy changes to k8s ") {
            steps{
                script{
                    def services = ["auth", "chat", "api-gateway", "gig", "notification", "order", "review", "user"]
                    def kubernetesServices = ["api-gateway-service", "app-notification-service", "auth-service", "chat-service", "elasticsearch", "gig-service", "heartbeat", "kibana", "metricbeat", "mongodb", "mysql", "notification-service", "order-service", "rabbitmq", "redis", "review-service", "secrets", "user-service"];

                    //  Applying changes to  k8s service like deployment statefulset etc...
                    kubernetesServices.each{k8s -> 
                        if(env[k8s.toUpperCase()] == "true") {  
                                sh """ 
                                    cd  k8s/minikube/${k8s}/
                                    kubectl --insecure-skip-tls-verify --token=${K8S_TOKEN} --server=${K8S_SERVER} apply -f .
                                    """
                        }
                    }
                    // Applying changes to service if any updation amde to k8s file directly
                    services.each{srv ->
                        if(env[srv.toUpperCase()] === "true") {
                            sh """ 
                                cd k8s/minikube/${srv}
                                kubectl --insecure-skip-tls-verify --token=${K8S_TOKEN} --server=${K8S_SERVER} apply -f .
                                """
                        }
                    }
                }
                

            }
        }

    }

    post{
        success {
            script{
               def name = sh(script: "git log -1 --pretty=format:'%an'", returnStdout: true).trim()
               def msg = "${name} just deployed a succesfull build ✅ More details:${env.BUILD_URL}"
               slackSend(channel: '#jenkins', color: 'good', message: msg)
            }
            
        }
        failure {
            script {
                def name = sh(script: "git log -1 --pretty=format:'%an'", returnStdout: true).trim()
                def msg = "🚨 *Build Alert!*   Uh-oh! ${name}'s latest build has failed ❌ "
                
                slackSend(channel: '#jenkins', color: 'danger', message: msg)
            }
        }

        error {
            slackSend(channel: '#jenkins', color: 'warning', message: '⚠️ Build encountered an error! Investigate Jenkins logs')
        }
    }
}





