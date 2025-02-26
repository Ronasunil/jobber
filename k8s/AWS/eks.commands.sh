

eksctl create cluster --name=jobber-cluster\
    --region=eu-east-1 \
    --vpc-private-subnets=id,id \
    --without-nodegroup

# Associate IAM OIDC
eksctl utils associate-iam-oidc-provider \
    --region=eu-east-1 \
    --cluster=jobber-cluster \
    --approve

# Create EKS nodegroup with private subnets(note run this command where your pem file is)
eksctl create nodegroup --cluster=jobber-cluster \
    --region=eu-east-1 \
    --name=jobber-node \
    --subnet-ids=id,id \
    --node-type=t3.large \
    --nodes=4 \
    --nodes-min=4 \
    --nodes-max=6 \
    --node-volume-size=20 \
    --ssh-access \
    --ssh-public-key=yourkey \
    --managed \
    --asg-access \
    --external-dns-access \
    --full-ecr-access \
    --appmesh-access \
    --alb-ingress-access \
    --node-private-networking