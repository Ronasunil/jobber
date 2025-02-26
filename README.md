# Jobber

## Prerequisites

Before running the application, ensure you have the following installed:

- **Docker**: Required to run the application using Docker Compose.
- **Kubernetes (K8s)**: Required for orchestrating services (optional for local development).
- **AWS CLI**: Required for deploying the application to AWS EKS (optional for local development).

## Installation and Setup

1. **Clone the Repository**

   ```sh
   git clone https://github.com/Ronasunil/jobber.git
   cd jobber
   ```

2. **Set Up Private Package Access**

   - Request the PAT (Personal Access Token) by messaging `+918848186648`.
   - Once received, add the token as an environment variable in your terminal:
     ```sh
     export PAT_TOKEN=<your-token>
     ```

3. **Configure Kibana**

   - Open `kibana.yml` and add your password.

4. **Run the Application**
   - Navigate to the root directory of the project.
   - Run the following command:
     ```sh
     docker compose up
     ```

## Accessing Services

- **API Endpoints**: Identify the necessary endpoints from each service and make requests accordingly.
- **Kibana Dashboard**: Available at `http://localhost:5601`.

## Kubernetes Deployment

For Kubernetes deployment:

1. **Install Kubernetes** (if not installed already).
2. **Deploy Each Service**
   ```sh
   kubectl apply -f k8s/minikube/  each-workloads
   ```

## AWS EKS Deployment

To deploy on AWS EKS:

1. **Create an EKS Cluster**

   ```sh
   eksctl create cluster using k8s/AWS/eks.command.sh
   ```

2. **Deploy Services to EKS**
   ```sh
   kubectl apply -f k8s/AWS/ each-workloads
   ```

## Notes

- The repository includes Kubernetes (`k8s/`) and AWS deployment (`eks/`) files for orchestration.
- Modify configurations as needed to suit your deployment environment.
- Play around and deploy services as required.

---

Feel free to reach out for any questions or issues!
