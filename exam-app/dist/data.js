// Complete question bank with all questions consolidated
window.__LARGE_BANK__ = {
  "questions": [
    {
      "question_number": 1,
      "question": "A company's users access an application through Amazon Route 53 where the domain points to an Application Load Balancer (ALB). The company needs a backup static error page if the primary website is unavailable, while minimizing infrastructure overhead. What should the Solutions Architect configure?",
      "options": [
        "A. Amazon CloudFront distribution in front of the ALB",
        "B. Route 53 active-passive failover to an S3 static website",
        "C. Route 53 latency-based routing with ALB",
        "D. Route 53 alias to ALB only"
      ],
      "correct_answer": "B",
      "explanation": "Use Route 53 failover routing with health checks. Primary = ALB. Secondary = S3 static site. When the ALB is unhealthy, Route 53 directs users to the S3 error page."
    },
    {
      "question_number": 2,
      "question": "Two applications need to communicate frequently with low latency and high throughput. Which EC2 placement group strategy should be used?",
      "options": [
        "A. Spread placement group",
        "B. Cluster placement group",
        "C. Partition placement group",
        "D. Multiple AZ deployment"
      ],
      "correct_answer": "B",
      "explanation": "Cluster placement groups place EC2 instances close together within an AZ for maximum network performance (low latency, high throughput)."
    },
    {
      "question_number": 117,
      "question": "A company migrated applications to AWS. Two applications need to access the same large set of files concurrently with low latency. Which solution is most appropriate?",
      "options": [
        "A. Store data on Amazon S3 and use signed URLs",
        "B. Store data on Amazon EBS volumes and attach to multiple instances",
        "C. Use Amazon Instance Store",
        "D. Use Amazon EFS with General Purpose performance mode"
      ],
      "correct_answer": "D",
      "explanation": "EFS provides concurrent, low-latency access to shared files across multiple applications and AZs."
    },
    {
      "question_number": 118,
      "question": "An e-commerce company notices performance degradation of its Amazon RDS-based application due to increasing read-only queries. The architect must improve performance with minimal changes. Which solution should be chosen?",
      "options": [
        "A. Scale vertically by moving to a larger RDS instance",
        "B. Enable Multi-AZ deployment",
        "C. Create read replicas of the primary database",
        "D. Use Amazon ElastiCache"
      ],
      "correct_answer": "C",
      "explanation": "Read replicas offload read-only queries from the primary RDS instance, improving performance with minimal changes."
    },
    {
      "question_number": 119,
      "question": "A company using Amazon RDS must comply with regulations requiring encryption of personally identifiable information (PII) at rest. The architect must minimize changes to the existing infrastructure. Which solution meets the requirement?",
      "options": [
        "A. Enable SSL/TLS connections to RDS",
        "B. Use application-level encryption libraries",
        "C. Store PII data in Amazon S3 with SSE-S3",
        "D. Enable RDS encryption using AWS KMS keys"
      ],
      "correct_answer": "D",
      "explanation": "Enabling RDS encryption with AWS KMS keys ensures PII is encrypted at rest with minimal changes."
    },
    {
      "question_number": 120,
      "question": "A Solutions Architect is moving static content from EC2 instances to Amazon S3. CloudFront will be used for delivery. Currently, the EC2 security group restricts access to specific IP ranges. The same restriction should apply to static content in S3. Which steps should be taken?",
      "options": [
        "A. Create an Origin Access Identity (OAI) and update the S3 bucket policy",
        "B. Use AWS WAF or CloudFront Geo/IP restrictions",
        "C. Add the security group to S3 bucket policy",
        "D. Make objects public with signed URLs"
      ],
      "correct_answer": "B",
      "explanation": "AWS WAF or CloudFront Geo/IP restrictions can enforce IP-based access control for S3 content delivered via CloudFront."
    },
    {
      "question_number": 121,
      "question": "A company uses Microsoft SQL Server with heavy read activity. Every 4 hours, the development team creates a full copy of the production database for testing, which impacts user experience. Which solution improves elasticity and availability without changing the database engine?",
      "options": [
        "A. Migrate to Amazon Aurora",
        "B. Use Amazon DynamoDB",
        "C. Use Amazon RDS Multi-AZ",
        "D. Use Amazon RDS for SQL Server snapshots to create test databases"
      ],
      "correct_answer": "D",
      "explanation": "The requirement is to stick with the current engine and improve efficiency. RDS snapshots can quickly create test databases without performance impact."
    },
    {
      "question_number": 122,
      "question": "A company enabled AWS CloudTrail to deliver logs to an Amazon S3 bucket for each developer account. The company created a central AWS account for auditing and needs all logs centralized securely. What is the optimal solution?",
      "options": [
        "A. Copy logs using AWS Glue",
        "B. Use S3 cross-region replication",
        "C. Deliver CloudTrail logs from all developer accounts into a central S3 bucket in the audit account",
        "D. Use Amazon Kinesis Data Firehose"
      ],
      "correct_answer": "C",
      "explanation": "CloudTrail can natively deliver logs from multiple accounts to a single centralized bucket."
    },
    {
      "question_number": 123,
      "question": "The business systems require file sharing via SMB that must be accessible from both on-premises and AWS. Which solution meets the requirement?",
      "options": [
        "A. Amazon EFS",
        "B. Amazon S3 File Gateway",
        "C. Amazon FSx for Windows File Server",
        "D. AWS Storage Gateway (File Gateway)"
      ],
      "correct_answer": "C, D",
      "explanation": "Both C and D are correct. FSx provides SMB access in the cloud; File Gateway provides SMB from on-premises."
    },
    {
      "question_number": 124,
      "question": "Which AWS feature allows you to automatically request the lowest price per unit of capacity, maintain target capacity for workloads like batch processing or HPC, and replace interrupted instances?",
      "options": [
        "A. Reserved Instances",
        "B. Savings Plans",
        "C. Spot Fleet",
        "D. On-Demand Instances"
      ],
      "correct_answer": "C",
      "explanation": "Spot Fleet manages target capacity automatically with lowest-cost spot instances."
    },
    {
      "question_number": 125,
      "question": "A system must attach to multiple Amazon EC2 Windows instances for shared storage. What should the Solutions Architect do?",
      "options": [
        "A. Use Amazon EBS volumes attached to multiple instances",
        "B. Use Amazon EFS (Linux only)",
        "C. Use Amazon FSx for Windows File Server",
        "D. Use Amazon S3 File Gateway"
      ],
      "correct_answer": "C",
      "explanation": "FSx for Windows File Server supports SMB and works for Windows shared storage."
    },
    {
      "question_number": 126,
      "question": "A company created an isolated backup environment. Which solution ensures automatic failover between regions?",
      "options": [
        "A. Use CloudWatch alarms with Lambda",
        "B. Enable Amazon Route 53 health checks with failover routing",
        "C. Use AWS Config",
        "D. Enable CloudTrail integration"
      ],
      "correct_answer": "B",
      "explanation": "Route 53 failover with health checks automates active-passive disaster recovery."
    },
    {
      "question_number": 127,
      "question": "A mobile chat app stores data in DynamoDB. Users want new messages to be read with the lowest latency possible. The solution must require minimal application change. What should be used?",
      "options": [
        "A. DynamoDB Accelerator (DAX)",
        "B. DynamoDB Streams",
        "C. Amazon ElastiCache for Redis",
        "D. DynamoDB Global Tables"
      ],
      "correct_answer": "A",
      "explanation": "DAX is a managed caching layer for DynamoDB that reduces latency to microseconds with minimal code changes."
    },
    {
      "question_number": 128,
      "question": "A mobile app is built with Amazon EC2 instances behind an ALB and uses Amazon RDS. The workload is read-heavy, causing performance issues. How can this be addressed?",
      "options": [
        "A. Enable Multi-AZ for RDS",
        "B. Use ElastiCache in front of RDS",
        "C. Add Read Replicas to RDS and direct traffic to them",
        "D. Switch to DynamoDB"
      ],
      "correct_answer": "C",
      "explanation": "Read replicas reduce load on the primary RDS instance for read-heavy workloads."
    },
    {
      "question_number": 129,
      "question": "A company hosts its static website on Amazon S3. To improve performance and reduce costs, what should be done?",
      "options": [
        "A. Use S3 Transfer Acceleration",
        "B. Use Amazon CloudFront with S3 as the origin",
        "C. Enable S3 replication",
        "D. Use S3 Intelligent-Tiering"
      ],
      "correct_answer": "B",
      "explanation": "CloudFront improves distribution speed and reduces cost for global access."
    },
    {
      "question_number": 130,
      "question": "A Solutions Architect must design an IAM policy for a Lambda function that allows only PutItem, UpdateItem, and DeleteItem actions on a DynamoDB table named \"Books\". Which policy fulfills this requirement?",
      "options": [
        "A. An IAM policy allowing only PutItem, UpdateItem, and DeleteItem actions on the \"Books\" table",
        "B. A policy granting full access to DynamoDB",
        "C. A policy allowing all actions on all tables",
        "D. A policy with inline permissions for all DynamoDB resources"
      ],
      "correct_answer": "A",
      "explanation": "Principle of least privilege — allow only required actions on the specific table."
    },
    {
      "question_number": 131,
      "question": "A company wants a backup website if the primary one is down. Which solution should be used?",
      "options": [
        "A. Use Amazon S3 website hosting for the backup website and Route 53 failover routing policy",
        "B. Route 53 latency-based routing",
        "C. Use an Application Load Balancer",
        "D. Use server-side redirection"
      ],
      "correct_answer": "A",
      "explanation": "Failover routing with Route 53 and S3 static hosting ensures backup availability."
    },
    {
      "question_number": 132,
      "question": "A media company is moving to AWS. It requires: 10 TB of highest-performance storage for video processing, 300 TB durable storage for media content, 900 TB for archival storage. Which set of services meets this requirement?",
      "options": [
        "A. Amazon EBS, Amazon S3, Amazon S3 Glacier",
        "B. Amazon EFS, Amazon S3, Amazon S3 Glacier Deep Archive",
        "C. DynamoDB, Amazon S3, Amazon S3 Glacier",
        "D. Instance Store, Amazon S3, Amazon S3 Glacier"
      ],
      "correct_answer": "D",
      "explanation": "Instance store provides the highest performance, S3 for durability, and Glacier for archival."
    },
    {
      "question_number": 133,
      "question": "A company uses S3 for object storage, but lifecycle policies are inconsistent, causing high costs. Which solution lowers cost without reducing availability?",
      "options": [
        "A. Use S3 Standard-IA",
        "B. Use S3 Glacier",
        "C. Use S3 Intelligent-Tiering",
        "D. Use S3 One Zone-IA"
      ],
      "correct_answer": "C",
      "explanation": "Intelligent-Tiering automatically optimizes storage cost for unpredictable access patterns."
    },
    {
      "question_number": 134,
      "question": "Sensitive data is stored in an S3 bucket. It must not be accessible from the internet, only from within a VPC. What combination of actions should be taken?",
      "options": [
        "A. Create a VPC endpoint for S3",
        "B. Enable S3 Transfer Acceleration",
        "C. Apply a bucket policy to allow access only from the endpoint",
        "D. Enable versioning"
      ],
      "correct_answer": "A, C",
      "explanation": "Combining an S3 VPC endpoint with a restrictive bucket policy ensures no internet access."
    },
    {
      "question_number": 135,
      "question": "A web app runs on EC2 behind an ALB. Generating a custom weather report takes up to 5 minutes, exhausting available connections. How can the system be made more responsive?",
      "options": [
        "A. Use Amazon SQS and AWS Lambda (or EC2 workers) for asynchronous report generation",
        "B. Increase ALB idle timeout",
        "C. Add caching in front of the database",
        "D. Use Elastic Beanstalk"
      ],
      "correct_answer": "A",
      "explanation": "Asynchronous processing decouples long-running tasks, freeing up web tier connections."
    },
    {
      "question_number": 136,
      "question": "A Solutions Architect must create a highly available solution with minimal maintenance effort. Which option is best?",
      "options": [
        "A. Use Classic Load Balancer",
        "B. Use Application Load Balancer",
        "C. Use manual IP-based configuration",
        "D. Use a Network Load Balancer"
      ],
      "correct_answer": "D",
      "explanation": "NLB provides high availability, scalability, and requires minimal manual updates."
    },
    {
      "question_number": 137,
      "question": "A web app processes customer orders. Web tier → ALB, Middle tier → 3 EC2 instances via SQS, Database → DynamoDB. Users report delays in order confirmations due to long processing times. What is the most cost-effective solution?",
      "options": [
        "A. Use Amazon Kinesis Data Firehose",
        "B. Add caching for DynamoDB",
        "C. Use CloudFront in front of the app",
        "D. Use EC2 Auto Scaling to scale out the middle tier"
      ],
      "correct_answer": "D",
      "explanation": "Scaling the middle tier reduces processing delays."
    },
    {
      "question_number": 138,
      "question": "An application typically runs 4 EC2 instances, but must scale up to 12 during peak load. It must be highly available. Which solution meets the requirements?",
      "options": [
        "A. Auto Scaling group: min 2, max 12, spread across 2 AZs",
        "B. Auto Scaling group: min 4, max 12, with at least 4 instances across 2 AZs",
        "C. Use Spot instances only",
        "D. Use On-Demand instances in a single AZ"
      ],
      "correct_answer": "B",
      "explanation": "Ensures at least 4 instances across multiple AZs for high availability."
    },
    {
      "question_number": 139,
      "question": "A database migration requires 64,000 IOPS on a single EBS volume. What is the correct solution?",
      "options": [
        "A. Use multiple General Purpose SSD (gp3) volumes",
        "B. Use a Nitro-based EC2 instance with Provisioned IOPS SSD (io1) EBS volume",
        "C. Use S3 with lifecycle rules",
        "D. Use Instance Store"
      ],
      "correct_answer": "B",
      "explanation": "io1 volumes on Nitro instances can scale to 64,000 IOPS."
    },
    {
      "question_number": 140,
      "question": "A new application needs very high network throughput between EC2 instances. Which component should be included in the design?",
      "options": [
        "A. Elastic IPs",
        "B. Placement group using cluster strategy",
        "C. S3 Transfer Acceleration",
        "D. NAT Gateway"
      ],
      "correct_answer": "B",
      "explanation": "Cluster placement groups enable low-latency, high-bandwidth networking between EC2 instances."
    },
    {
      "question_number": 141,
      "question": "A company has global users accessing an application deployed in multiple AWS Regions. The application exposes public static IP addresses. Users experience poor performance when accessing the application over the internet. What should the Solutions Architect recommend?",
      "options": [
        "A. Use AWS Global Accelerator with static IPs and configure endpoints",
        "B. Use CloudFront with caching",
        "C. Use Route 53 latency-based routing",
        "D. Use an Application Load Balancer"
      ],
      "correct_answer": "A",
      "explanation": "AWS Global Accelerator provides static IPs announced globally and routes traffic over AWS's backbone network, reducing latency."
    },
    {
      "question_number": 142,
      "question": "A company must encrypt all data at rest in AWS with full control of key lifecycle management. The security team requires the ability to immediately revoke keys and audit usage independently of AWS. Which service satisfies this requirement?",
      "options": [
        "A. AWS KMS with customer-managed keys",
        "B. AWS KMS with CloudHSM custom key store",
        "C. Amazon S3 server-side encryption with AWS-managed keys",
        "D. AWS Secrets Manager"
      ],
      "correct_answer": "B",
      "explanation": "A CloudHSM custom key store in KMS allows complete control of encryption keys, including deletion and auditing."
    },
    {
      "question_number": 143,
      "question": "A two-tier application is deployed in two AZs in the us-east-1 Region. Web servers run in public subnets, and DB servers run in private subnets. The DB servers cannot download OS patches from the internet. What is the most secure, least operational overhead solution?",
      "options": [
        "A. Deploy a NAT Gateway in a public subnet in each AZ and update private subnet route tables",
        "B. Use an internet gateway in private subnets",
        "C. Use a NAT instance in private subnets",
        "D. Manually copy patches to instances"
      ],
      "correct_answer": "A",
      "explanation": "NAT Gateways in public subnets let private resources download patches while preventing inbound connections."
    },
    {
      "question_number": 144,
      "question": "A company's application runs on EC2 and receives data from a third-party vendor in real time via a REST API. At peak load, the application returns 503 errors due to overload. What should the Solutions Architect recommend?",
      "options": [
        "A. Use Amazon Kinesis Data Streams with AWS Lambda for processing",
        "B. Scale vertically with larger EC2",
        "C. Use Amazon SQS FIFO queue",
        "D. Enable Multi-AZ RDS"
      ],
      "correct_answer": "A",
      "explanation": "Kinesis Data Streams + Lambda provides scalable ingestion and near real-time processing, avoiding overload."
    },
    {
      "question_number": 145,
      "question": "A static single-page application is accessed via a custom domain. The solution must be fully serverless. Which services should be used?",
      "options": [
        "A. Amazon S3 for hosting",
        "B. AWS Elastic Beanstalk",
        "C. Amazon RDS",
        "D. Amazon CloudFront for distribution"
      ],
      "correct_answer": "A, D",
      "explanation": "S3 + CloudFront is a serverless and cost-effective solution for static websites."
    },
    {
      "question_number": 146,
      "question": "A company is migrating file shares to AWS. Users must access them using the SMB protocol. Which AWS service satisfies this requirement?",
      "options": [
        "A. Amazon EFS",
        "B. Amazon FSx for Windows File Server",
        "C. Amazon S3 with Transfer Acceleration",
        "D. AWS Storage Gateway (Tape Gateway)"
      ],
      "correct_answer": "B",
      "explanation": "FSx for Windows File Server supports native SMB access."
    },
    {
      "question_number": 147,
      "question": "A customer-facing application has variable read/write traffic throughout the year. Management requires auditing and point-in-time recovery for the database. Which service should be used?",
      "options": [
        "A. Amazon RDS with automated backups and auditing enabled",
        "B. Amazon DynamoDB with streams",
        "C. Amazon Redshift",
        "D. Amazon Aurora Serverless v1"
      ],
      "correct_answer": "A",
      "explanation": "RDS provides backups, auditing, and automated PITR to meet compliance requirements."
    },
    {
      "question_number": 148,
      "question": "A company migrated an Oracle database and requires a disaster recovery strategy with a maximum RTO of 2 hours and RPO ≤ 3 hours. The standby DB must run in another AWS Region. Which solution meets the requirements cost-effectively?",
      "options": [
        "A. Multi-AZ RDS deployment",
        "B. Amazon Aurora Global Database",
        "C. Enable automatic snapshots and copy them cross-Region every 3 hours",
        "D. Use DynamoDB Global Tables"
      ],
      "correct_answer": "C",
      "explanation": "Cross-Region snapshot copies provide cost-effective DR with defined RPO/RTO."
    },
    {
      "question_number": 149,
      "question": "A monolithic application runs on a single EC2 instance. Due to app limitations, it cannot be auto scaled horizontally. The CTO wants an automated recovery solution. What should be done?",
      "options": [
        "A. Use CloudWatch alarms with EC2 recovery actions",
        "B. Use Auto Scaling groups with health checks",
        "C. Create an AMI and redeploy manually",
        "D. Deploy to Lambda"
      ],
      "correct_answer": "A",
      "explanation": "EC2 recovery actions automatically recover impaired instances without scaling out."
    },
    {
      "question_number": 150,
      "question": "A legacy document management application runs on Windows servers in an on-premises data center using network file shares. The CIO wants to migrate storage to AWS while minimizing app changes. Which solution should the Architect recommend?",
      "options": [
        "A. Use AWS Storage Gateway (File Gateway)",
        "B. Use Amazon S3 Glacier",
        "C. Use Amazon DynamoDB",
        "D. Use Amazon FSx for Lustre"
      ],
      "correct_answer": "A",
      "explanation": "File Gateway integrates on-premises apps with S3 as a backend, exposing file shares via SMB/NFS."
    },
    {
      "question_number": 151,
      "question": "A company is designing a hybrid application using AWS Cloud. The network between the on-premises data center and AWS must use AWS Direct Connect. The application connectivity must be highly resilient. Which DX configuration should be implemented?",
      "options": [
        "A. Configure a single DX connection at one location",
        "B. Configure DX connections at multiple DX locations",
        "C. Configure VPN over DX for backup",
        "D. Configure multiple VPN connections only"
      ],
      "correct_answer": "B",
      "explanation": "Multiple DX locations provide redundancy and high availability for hybrid connectivity."
    },
    {
      "question_number": 152,
      "question": "A company runs an application on Amazon EC2 instances in private subnets across three Availability Zones in a region. The instances must connect to the internet to download files. The design must be highly available. What should be implemented?",
      "options": [
        "A. Use one NAT instance in a single AZ",
        "B. Deploy a NAT gateway in a public subnet of each AZ",
        "C. Attach an Internet Gateway directly to private subnets",
        "D. Use VPC endpoints"
      ],
      "correct_answer": "B",
      "explanation": "NAT Gateways in each AZ provide highly available internet access for private subnets."
    },
    {
      "question_number": 153,
      "question": "Application developers noticed the production application is slow when business users run reporting queries against the Amazon RDS database. CPU and memory metrics never exceed 60%, but reporting affects performance. How can this requirement be met?",
      "options": [
        "A. Scale RDS instance vertically",
        "B. Use Amazon Redshift",
        "C. Run reporting queries against RDS read replicas",
        "D. Use ElastiCache for reporting"
      ],
      "correct_answer": "C",
      "explanation": "Read replicas offload reporting queries, reducing load on the primary DB."
    },
    {
      "question_number": 154,
      "question": "A company runs a two-tier e-commerce website using a public-facing ELB that sends traffic to EC2 instances in private subnets. Static content is on EC2, dynamic content from MySQL. Users in Europe and Australia report poor experience. What is the most cost-effective solution?",
      "options": [
        "A. Deploy additional ELBs and EC2 in EU and AU",
        "B. Use Amazon CloudFront and S3 for static content",
        "C. Move database to Aurora Global Database",
        "D. Replicate full stack in EU and AU"
      ],
      "correct_answer": "B",
      "explanation": "CloudFront caches and accelerates global content delivery at low cost."
    },
    {
      "question_number": 155,
      "question": "A company website provides downloadable performance reports. The solution must scale to meet global demand, minimize provisioning of infrastructure, and provide the fastest response time. What should the Solutions Architect recommend?",
      "options": [
        "A. Use Amazon CloudFront with Amazon S3",
        "B. Use EC2 Auto Scaling in each region",
        "C. Use API Gateway + Lambda + DynamoDB",
        "D. Use on-premises CDN"
      ],
      "correct_answer": "A",
      "explanation": "S3 + CloudFront is serverless, scales automatically, and provides global low-latency delivery."
    },
    {
      "question_number": 156,
      "question": "A company wants a shared file system for .NET application servers and SQL Server DBs on EC2 Windows Server 2016. It must integrate with Active Directory, be highly available, and provide high throughput. Which solution meets this?",
      "options": [
        "A. Use Amazon FSx for Windows File Server",
        "B. Use EFS",
        "C. Use S3",
        "D. Use Storage Gateway"
      ],
      "correct_answer": "A",
      "explanation": "FSx for Windows File Server supports SMB, integrates with AD, and scales performance."
    },
    {
      "question_number": 157,
      "question": "A company with 100s of applications behind load balancers in multiple regions wants to allowlist LB IPs in its firewall with a highly available solution that reduces the number of IPs. What should the architect recommend?",
      "options": [
        "A. Use Route 53 latency-based routing",
        "B. Use CloudFront",
        "C. Use AWS Global Accelerator and configure endpoints",
        "D. Use NAT gateways per region"
      ],
      "correct_answer": "C",
      "explanation": "Global Accelerator provides static IPs while routing traffic to ALBs globally, reducing firewall rule management."
    },
    {
      "question_number": 158,
      "question": "An application running in Amazon ECS resizes images and stores them in S3. The app needs permission to access S3. What is the correct solution?",
      "options": [
        "A. Attach S3 access policy to EC2 host",
        "B. Create an IAM role with S3 permissions and assign it as the ECS task role",
        "C. Hardcode AWS keys in the container",
        "D. Use access keys stored in SSM Parameter Store"
      ],
      "correct_answer": "B",
      "explanation": "ECS task roles provide least-privilege IAM permissions securely without storing credentials."
    },
    {
      "question_number": 159,
      "question": "A company is migrating virtual server workloads to AWS. It has an internet-facing load balancer backed by application servers. The servers need to download OS patches from internet repositories. Which services are needed?",
      "options": [
        "A. VPC endpoints + ALB",
        "B. NAT Gateway + ALB",
        "C. Direct Connect + NAT instance",
        "D. VPN + ALB"
      ],
      "correct_answer": "B",
      "explanation": "ALB distributes traffic to EC2, and NAT Gateway lets private instances fetch updates."
    },
    {
      "question_number": 160,
      "question": "A new AWS account is provisioned. The company is concerned about the security of the root user. What should be done?",
      "options": [
        "A. Delete the root user",
        "B. Create IAM users for daily tasks and enable MFA on the root user",
        "C. Rotate root password every 30 days",
        "D. Share root credentials securely with admins"
      ],
      "correct_answer": "B",
      "explanation": "Best practice: don't use root for daily ops, enforce MFA, and delegate tasks via IAM users."
    },
    {
      "question_number": 161,
      "question": "A company wants to implement a hybrid cloud solution where on-premises applications can access AWS services securely. Which AWS service provides the most cost-effective solution?",
      "options": [
        "A. AWS Direct Connect",
        "B. AWS VPN CloudHub",
        "C. AWS Site-to-Site VPN",
        "D. AWS Transit Gateway"
      ],
      "correct_answer": "C",
      "explanation": "Site-to-Site VPN provides secure, cost-effective connectivity between on-premises and AWS without dedicated infrastructure."
    },
    {
      "question_number": 162,
      "question": "An application needs to process large amounts of data in parallel across multiple EC2 instances. Which service should be used for job scheduling and resource management?",
      "options": [
        "A. AWS Batch",
        "B. Amazon ECS",
        "C. AWS Lambda",
        "D. Amazon EKS"
      ],
      "correct_answer": "A",
      "explanation": "AWS Batch is designed for batch computing workloads and automatically provisions compute resources for parallel processing."
    },
    {
      "question_number": 163,
      "question": "A company needs to store and analyze log data from multiple sources with real-time processing capabilities. Which combination of services is most appropriate?",
      "options": [
        "A. Amazon Kinesis Data Streams + Amazon Elasticsearch Service",
        "B. Amazon S3 + Amazon Athena",
        "C. Amazon CloudWatch Logs + Amazon QuickSight",
        "D. Amazon DynamoDB + Amazon Redshift"
      ],
      "correct_answer": "A",
      "explanation": "Kinesis Data Streams provides real-time data ingestion, and Elasticsearch enables real-time search and analytics on log data."
    },
    {
      "question_number": 164,
      "question": "A company wants to implement a serverless web application with user authentication and authorization. Which services should be used?",
      "options": [
        "A. Amazon Cognito + API Gateway + Lambda",
        "B. Amazon RDS + Application Load Balancer + EC2",
        "C. Amazon DynamoDB + Amazon ECS + Fargate",
        "D. Amazon Aurora + Amazon EKS + Lambda"
      ],
      "correct_answer": "A",
      "explanation": "Cognito provides user authentication, API Gateway handles API requests, and Lambda provides serverless compute for the application logic."
    },
    {
      "question_number": 165,
      "question": "A company needs to implement a disaster recovery solution with an RTO of 4 hours and RPO of 1 hour. The primary database is Amazon RDS MySQL. Which solution is most cost-effective?",
      "options": [
        "A. Multi-AZ RDS deployment",
        "B. Cross-region read replicas with automated failover",
        "C. RDS snapshots with cross-region replication",
        "D. Amazon Aurora Global Database"
      ],
      "correct_answer": "C",
      "explanation": "Cross-region snapshot replication provides cost-effective disaster recovery with defined RPO/RTO without the complexity of active replication."
    },
    {
      "question_number": 166,
      "question": "An application needs to store user session data with sub-millisecond latency and automatic scaling. Which service is most appropriate?",
      "options": [
        "A. Amazon ElastiCache for Redis",
        "B. Amazon DynamoDB",
        "C. Amazon RDS with read replicas",
        "D. Amazon S3 with CloudFront"
      ],
      "correct_answer": "A",
      "explanation": "ElastiCache for Redis provides in-memory storage with sub-millisecond latency and automatic scaling for session data."
    },
    {
      "question_number": 167,
      "question": "A company wants to implement a content delivery network for a global web application. Which AWS service provides the best performance and cost optimization?",
      "options": [
        "A. Amazon CloudFront with S3 origin",
        "B. Application Load Balancer with multiple regions",
        "C. Amazon Route 53 with health checks",
        "D. AWS Global Accelerator"
      ],
      "correct_answer": "A",
      "explanation": "CloudFront provides global content delivery with edge caching, reducing latency and costs for static and dynamic content."
    },
    {
      "question_number": 168,
      "question": "A company needs to implement a secure file sharing solution for employees working remotely. The solution must integrate with existing Active Directory. Which service is most appropriate?",
      "options": [
        "A. Amazon WorkDocs",
        "B. Amazon S3 with IAM policies",
        "C. Amazon FSx for Windows File Server",
        "D. Amazon EFS with access points"
      ],
      "correct_answer": "C",
      "explanation": "FSx for Windows File Server provides native SMB file sharing with Active Directory integration for secure remote access."
    },
    {
      "question_number": 169,
      "question": "An application needs to process streaming data from IoT devices with real-time analytics. Which combination of services is most appropriate?",
      "options": [
        "A. Amazon Kinesis Data Streams + Kinesis Analytics + Lambda",
        "B. Amazon SQS + Lambda + DynamoDB",
        "C. Amazon MQ + ECS + RDS",
        "D. Amazon EventBridge + Step Functions + S3"
      ],
      "correct_answer": "A",
      "explanation": "Kinesis Data Streams handles real-time data ingestion, Kinesis Analytics provides real-time processing, and Lambda enables custom processing logic."
    },
    {
      "question_number": 170,
      "question": "A company needs to implement a backup solution for EC2 instances with automated lifecycle management. Which service provides the most cost-effective solution?",
      "options": [
        "A. Amazon EBS snapshots with lifecycle policies",
        "B. Amazon S3 with Intelligent-Tiering",
        "C. AWS Backup service",
        "D. Amazon Glacier with lifecycle rules"
      ],
      "correct_answer": "C",
      "explanation": "AWS Backup provides centralized backup management with automated lifecycle policies and cost optimization for EC2 instances."
    },
    {
      "question_number": 171,
      "question": "An application needs to store and query time-series data from sensors with high write throughput. Which service is most appropriate?",
      "options": [
        "A. Amazon Timestream",
        "B. Amazon DynamoDB with TTL",
        "C. Amazon RDS with partitioning",
        "D. Amazon Redshift with time-series tables"
      ],
      "correct_answer": "A",
      "explanation": "Amazon Timestream is purpose-built for time-series data with automatic scaling and cost optimization for IoT and sensor data."
    },
    {
      "question_number": 172,
      "question": "A company needs to implement a secure API with rate limiting and authentication. Which combination of services is most appropriate?",
      "options": [
        "A. API Gateway + Amazon Cognito + Usage Plans",
        "B. Application Load Balancer + Lambda + DynamoDB",
        "C. Amazon CloudFront + S3 + IAM",
        "D. Amazon ECS + RDS + ElastiCache"
      ],
      "correct_answer": "A",
      "explanation": "API Gateway provides built-in authentication, rate limiting, and usage plans, while Cognito handles user authentication and authorization."
    },
    {
      "question_number": 173,
      "question": "A company needs to implement a data lake for analytics with support for multiple data formats. Which combination of services is most appropriate?",
      "options": [
        "A. Amazon S3 + AWS Glue + Amazon Athena",
        "B. Amazon RDS + Amazon Redshift + QuickSight",
        "C. Amazon DynamoDB + Amazon Kinesis + Lambda",
        "D. Amazon EMR + Amazon S3 + Amazon SageMaker"
      ],
      "correct_answer": "A",
      "explanation": "S3 provides scalable storage, Glue handles data cataloging and ETL, and Athena enables SQL queries on the data lake."
    },
    {
      "question_number": 174,
      "question": "A company needs to implement a machine learning pipeline for image classification with automatic model retraining. Which combination of services is most appropriate?",
      "options": [
        "A. Amazon SageMaker + S3 + Lambda",
        "B. Amazon Rekognition + API Gateway",
        "C. Amazon Comprehend + Kinesis",
        "D. Amazon Textract + DynamoDB"
      ],
      "correct_answer": "A",
      "explanation": "SageMaker provides end-to-end ML capabilities including model training, deployment, and automatic retraining with S3 for data storage and Lambda for orchestration."
    }
  ]
};

// Append 65 provided questions to the large bank
;(function(){
  const added = [
    {"question_number": 10001, "question": "A company needs to deploy a web application that can handle sudden traffic spikes and must maintain high availability across multiple AWS regions. The application uses a MySQL database. Which architecture provides the MOST resilient solution?", "options": ["A. Deploy the application on EC2 instances in a single AZ with RDS MySQL Multi-AZ deployment","B. Use Elastic Beanstalk with Auto Scaling across multiple AZs and Amazon Aurora Global Database","C. Deploy on ECS Fargate with Application Load Balancer and RDS MySQL with read replicas","D. Use Lambda functions with API Gateway and DynamoDB Global Tables"], "correct_answer": "B", "explanation": "Elastic Beanstalk provides automatic scaling and multi-AZ deployment capabilities. Aurora Global Database offers cross-region replication with low latency, providing the highest resilience for sudden traffic spikes and regional failures."},
    {"question_number": 10002, "question": "A financial services company requires that all data stored in S3 buckets must be encrypted at rest and in transit. The encryption keys must be managed by the company and rotated annually. Which solution meets these requirements?", "options": ["A. Use S3 default encryption with SSE-S3 and enable bucket versioning","B. Use SSE-KMS with customer-managed keys and enable automatic key rotation","C. Use SSE-C with client-provided encryption keys and manual rotation","D. Use SSE-KMS with AWS managed keys and CloudTrail logging"], "correct_answer": "B", "explanation": "SSE-KMS with customer-managed keys allows the company to control the encryption keys while AWS KMS provides automatic annual rotation capability. This meets both the company management and rotation requirements."},
    {"question_number": 10003, "question": "An e-commerce application experiences high read traffic on product catalog data stored in a relational database. The data is updated infrequently but read operations are causing database performance issues. What is the MOST effective solution to improve read performance?", "options": ["A. Implement Amazon ElastiCache for Redis as a caching layer","B. Create RDS read replicas in multiple AZs","C. Migrate to DynamoDB with Global Secondary Indexes","D. Use Amazon CloudFront with S3 for static content delivery"], "correct_answer": "A", "explanation": "ElastiCache for Redis provides sub-millisecond latency for read operations and can significantly reduce the load on the primary database for frequently accessed catalog data. It's specifically designed for caching scenarios with high read traffic."},
    {"question_number": 10004, "question": "A company runs a batch processing workload that can tolerate interruptions and has flexible start times. The workload typically runs for 2-4 hours daily. Which EC2 pricing model would provide the LOWEST cost?", "options": ["A. On-Demand Instances","B. Reserved Instances with 1-year term","C. Spot Instances","D. Dedicated Hosts"], "correct_answer": "C", "explanation": "Spot Instances can provide up to 90% cost savings compared to On-Demand pricing. Since the workload can tolerate interruptions and has flexible timing, Spot Instances are ideal for this batch processing use case."},
    {"question_number": 10005, "question": "A company wants to implement disaster recovery for their critical application with an RTO of 1 hour and RPO of 15 minutes. The application runs on EC2 instances with EBS volumes and uses RDS MySQL. Which DR strategy is MOST appropriate?", "options": ["A. Backup and Restore using S3 Cross-Region Replication","B. Pilot Light with pre-deployed infrastructure in another region","C. Warm Standby with scaled-down resources in another region","D. Multi-Site Active-Active deployment across regions"], "correct_answer": "C", "explanation": "Warm Standby provides the right balance for the specified RTO (1 hour) and RPO (15 minutes). It maintains scaled-down resources that can be quickly scaled up, meeting the recovery time requirements cost-effectively."},
    {"question_number": 10006, "question": "A web application needs to authenticate users and authorize access to different application features based on user roles. The solution should integrate with existing corporate Active Directory. Which AWS service combination provides the BEST solution?", "options": ["A. Amazon Cognito User Pools with SAML identity provider","B. AWS SSO with Active Directory connector","C. IAM roles with SAML federation","D. Amazon Cognito Identity Pools with IAM roles"], "correct_answer": "A", "explanation": "Amazon Cognito User Pools with SAML identity provider integration allows seamless integration with Active Directory while providing user authentication and role-based authorization features specifically designed for web applications."},
    {"question_number": 10007, "question": "A video streaming application needs to deliver content globally with minimal latency. The application serves both live streaming and on-demand video content. Which architecture provides optimal performance?", "options": ["A. CloudFront with S3 origin and AWS Elemental MediaStore for live content","B. S3 with Transfer Acceleration and Elastic Transcoder","C. CloudFront with multiple regional S3 buckets as origins","D. Application Load Balancer with EC2 instances in multiple regions"], "correct_answer": "A", "explanation": "CloudFront provides global content delivery with edge locations worldwide. S3 is optimal for on-demand content, while AWS Elemental MediaStore is specifically designed for live streaming with ultra-low latency requirements."},
    {"question_number": 10008, "question": "A company stores 500TB of infrequently accessed data that must be retained for 7 years for compliance. The data is accessed less than once per quarter. Which storage solution provides the LOWEST cost?", "options": ["A. S3 Standard-IA with lifecycle policies","B. S3 Glacier Flexible Retrieval","C. S3 Glacier Deep Archive","D. EBS Cold HDD volumes"], "correct_answer": "C", "explanation": "S3 Glacier Deep Archive is the lowest-cost storage class for data that is rarely accessed and has retrieval times of 12-48 hours, making it perfect for compliance data that's accessed less than once per quarter."},
    {"question_number": 10009, "question": "An application processes messages from an SQS queue. During peak times, message processing takes longer than the visibility timeout, causing messages to be processed multiple times. What is the BEST solution to prevent duplicate processing?", "options": ["A. Increase the visibility timeout of the SQS queue","B. Implement message deduplication in the application logic","C. Use SQS FIFO queue with message deduplication","D. Switch to Amazon Kinesis Data Streams"], "correct_answer": "A", "explanation": "Increasing the visibility timeout ensures that messages remain hidden from other consumers for a longer period, preventing duplicate processing when message processing takes longer than expected during peak times."},
    {"question_number": 10010, "question": "A company wants to ensure that their S3 bucket is accessible only from their VPC and specific IP addresses. Which combination of mechanisms should they implement?", "options": ["A. S3 bucket policy with Condition elements for VPC endpoint and IP addresses","B. VPC endpoint with security groups and NACLs","C. IAM policies with IP address conditions","D. S3 Block Public Access with VPC endpoint"], "correct_answer": "A", "explanation": "S3 bucket policies with Condition elements allow you to restrict access based on VPC endpoint (aws:sourceVpce) and specific IP addresses (aws:sourceIp), providing precise access control for the bucket."},
    {"question_number": 10011, "question": "A gaming application requires a database that can handle millions of requests per second with single-digit millisecond latency. The data access patterns are simple key-value lookups. Which database solution is MOST suitable?", "options": ["A. Amazon RDS MySQL with read replicas","B. Amazon DynamoDB with DAX","C. Amazon ElastiCache for Redis","D. Amazon Aurora with Aurora Replicas"], "correct_answer": "B", "explanation": "DynamoDB with DAX (DynamoDB Accelerator) provides microsecond latency for read operations and can handle millions of requests per second, making it ideal for gaming applications requiring extreme performance for key-value operations."},
    {"question_number": 10012, "question": "A development team runs multiple environments (dev, test, staging) that are only used during business hours. Which strategy would MOST effectively reduce costs?", "options": ["A. Use Reserved Instances for all environments","B. Implement Auto Scaling to scale down to zero instances after hours","C. Use Spot Instances for all non-production environments","D. Schedule EC2 instances to start/stop using Lambda and EventBridge"], "correct_answer": "D", "explanation": "Scheduling instances to start and stop automatically using Lambda functions triggered by EventBridge (CloudWatch Events) ensures resources are only running when needed, providing significant cost savings for development environments."},
    {"question_number": 10013, "question": "A company needs to ensure their multi-tier application can handle the failure of an entire Availability Zone. The application consists of web servers, application servers, and a database. Which design provides the HIGHEST availability?", "options": ["A. Deploy all tiers in a single AZ with frequent snapshots","B. Deploy web and app tiers across multiple AZs with RDS Multi-AZ","C. Use Auto Scaling groups across multiple AZs for all tiers with Aurora Global Database","D. Deploy in multiple regions with Route 53 health checks"], "correct_answer": "B", "explanation": "Deploying web and application tiers across multiple AZs with Auto Scaling and using RDS Multi-AZ provides automatic failover capabilities and ensures the application can continue operating if an entire AZ fails."},
    {"question_number": 10014, "question": "A company wants to implement network segmentation for a three-tier application (web, app, database) in AWS. Each tier should only communicate with adjacent tiers. What is the MOST secure approach?", "options": ["A. Use separate VPCs for each tier with VPC peering","B. Create separate subnets for each tier with security groups allowing only required traffic","C. Use separate AWS accounts for each tier","D. Implement NACLs with deny-all rules and specific allow rules for each tier"], "correct_answer": "B", "explanation": "Creating separate subnets for each tier with properly configured security groups provides stateful filtering and precise control over which traffic is allowed between tiers, implementing the principle of least privilege effectively."},
    {"question_number": 10015, "question": "An application needs to process large amounts of streaming data in real-time and perform complex analytics. The solution should be serverless and automatically scale based on incoming data volume. Which architecture is MOST appropriate?", "options": ["A. Amazon Kinesis Data Streams with EC2 consumers","B. Amazon Kinesis Data Firehose with S3 and Athena","C. Amazon Kinesis Data Streams with Lambda functions","D. Amazon SQS with ECS Fargate consumers"], "correct_answer": "C", "explanation": "Kinesis Data Streams with Lambda functions provides real-time processing capabilities with automatic scaling. Lambda can process records as they arrive and perform complex analytics without managing infrastructure."},
    {"question_number": 10016, "question": "A company has a workload that requires 20 EC2 instances running continuously for the next 3 years. The instances have consistent usage patterns. Which pricing strategy would provide the GREATEST cost savings?", "options": ["A. On-Demand Instances with Savings Plans","B. 3-year All Upfront Reserved Instances","C. 1-year No Upfront Reserved Instances renewed annually","D. Spot Instances with Auto Scaling"], "correct_answer": "B", "explanation": "3-year All Upfront Reserved Instances provide the highest discount (up to 75%) for workloads with predictable, continuous usage patterns over the 3-year commitment period."},
    {"question_number": 10017, "question": "A critical application requires zero data loss and near-zero downtime. The application uses a PostgreSQL database and processes financial transactions. Which database solution meets these requirements?", "options": ["A. RDS PostgreSQL with Multi-AZ deployment and automated backups","B. Amazon Aurora PostgreSQL with Global Database and backtrack","C. RDS PostgreSQL with cross-region read replicas","D. Amazon Aurora PostgreSQL-Compatible with Aurora Replicas"], "correct_answer": "B", "explanation": "Aurora Global Database provides cross-region replication with typically less than 1-second RPO, and Aurora's backtrack feature allows point-in-time recovery without restoring from backup, meeting the zero data loss and near-zero downtime requirements."},
    {"question_number": 10018, "question": "A web application stores sensitive customer data and must comply with PCI DSS requirements. The application needs to encrypt data at rest and in transit, and maintain detailed audit logs. Which combination of services should be used?", "options": ["A. ALB with SSL termination, EC2 with encrypted EBS, RDS with encryption, CloudTrail","B. CloudFront with SSL, Lambda functions, DynamoDB with encryption, CloudWatch Logs","C. NLB with TLS passthrough, EC2 with encryption, Aurora with encryption, AWS Config","D. API Gateway with SSL, ECS with encrypted tasks, DocumentDB with encryption, X-Ray"], "correct_answer": "A", "explanation": "This combination provides SSL/TLS encryption in transit (ALB), encryption at rest (encrypted EBS and RDS), and comprehensive audit logging (CloudTrail), meeting PCI DSS requirements for secure data handling."},
    {"question_number": 10019, "question": "A machine learning application needs to serve model predictions with ultra-low latency (< 10ms) to millions of users globally. The model size is 2GB and changes infrequently. What is the BEST architecture?", "options": ["A. SageMaker endpoints with Auto Scaling behind an ALB","B. Lambda functions with model stored in S3","C. EC2 instances with the model cached in memory behind CloudFront","D. ECS Fargate tasks with ElastiCache for model storage"], "correct_answer": "C", "explanation": "EC2 instances with the model cached in memory provide the fastest prediction latency, and CloudFront's global edge locations ensure low-latency access for users worldwide. The 2GB model size exceeds Lambda's limitations."},
    {"question_number": 10020, "question": "A company wants to optimize costs for their data warehouse that processes large datasets once per month. The processing takes 8 hours and requires high-performance computing resources. Which solution is MOST cost-effective?", "options": ["A. Keep dedicated EC2 instances running continuously","B. Use Auto Scaling to launch On-Demand instances monthly","C. Use Spot Instances with Auto Scaling for monthly processing","D. Use AWS Batch with Spot Fleet for monthly processing"], "correct_answer": "D", "explanation": "AWS Batch with Spot Fleet automatically manages the infrastructure and uses Spot Instances, which can provide up to 90% cost savings. Batch is designed for this type of periodic, compute-intensive workload."},
    {"question_number": 10021, "question": "An application uses SQS to process orders. During Black Friday, the queue receives 10x normal traffic, causing processing delays and potential message loss. What changes would improve resilience?", "options": ["A. Increase the visibility timeout and implement exponential backoff","B. Switch to SQS FIFO queue with higher throughput limits","C. Configure a Dead Letter Queue and increase consumer instances","D. Use multiple SQS queues with a load balancer"], "correct_answer": "C", "explanation": "A Dead Letter Queue captures messages that fail processing, preventing message loss. Increasing consumer instances handles the higher volume. This combination addresses both resilience and scalability."},
    {"question_number": 10022, "question": "A company needs to share sensitive documents with external partners securely. The documents should be accessible only for a limited time and downloads should be logged. Which solution provides the BEST security?", "options": ["A. S3 presigned URLs with expiration and CloudTrail logging","B. S3 bucket with public read access and time-based IAM policies","C. CloudFront signed URLs with S3 bucket policies","D. API Gateway with Lambda authorizer and S3 backend"], "correct_answer": "A", "explanation": "S3 presigned URLs provide time-limited access without exposing bucket credentials, and CloudTrail automatically logs all S3 access attempts, providing comprehensive audit trails for compliance."},
    {"question_number": 10023, "question": "A social media application needs to handle image uploads and automatically generate multiple thumbnail sizes. The solution should minimize processing time and cost while handling variable loads. Which architecture is OPTIMAL?", "options": ["A. EC2 instances with Auto Scaling for image processing","B. S3 upload triggers Lambda function for thumbnail generation","C. ECS Fargate with SQS for asynchronous processing","D. S3 upload triggers SQS message, processed by EC2 instances"], "correct_answer": "B", "explanation": "Lambda functions triggered by S3 events provide automatic scaling, pay-per-use pricing, and eliminate infrastructure management. This is ideal for variable image processing workloads."},
    {"question_number": 10024, "question": "A company runs analytics queries on historical data stored in S3. Queries are run sporadically and can tolerate longer execution times. Which combination optimizes costs?", "options": ["A. S3 Standard with EMR cluster using On-Demand instances","B. S3 Glacier with EMR cluster using Reserved Instances","C. S3 Intelligent-Tiering with Athena and Spot instances for complex queries","D. S3 Standard-IA with Redshift Spectrum"], "correct_answer": "C", "explanation": "S3 Intelligent-Tiering automatically moves data to the most cost-effective tier, Athena provides serverless querying with pay-per-query pricing, and Spot instances for EMR (when needed) provide additional cost savings."},
    {"question_number": 10025, "question": "A financial application requires that database transactions maintain ACID properties even during system failures. The application uses microservices architecture. Which database solution provides the BEST consistency guarantees?", "options": ["A. DynamoDB with DynamoDB Transactions","B. Amazon Aurora with Global Database","C. RDS MySQL with Multi-AZ deployment","D. Amazon DocumentDB with replica sets"], "correct_answer": "C", "explanation": "RDS MySQL with Multi-AZ provides strong ACID compliance with synchronous replication to a standby instance, ensuring data consistency and durability even during primary instance failures."},
    {"question_number": 10026, "question": "A healthcare application must ensure that patient data access is logged and monitored for compliance with HIPAA. The application runs on EC2 instances and uses RDS. Which monitoring solution is MOST comprehensive?", "options": ["A. CloudTrail for API logging and CloudWatch for system metrics","B. AWS Config for compliance and GuardDuty for threat detection","C. CloudTrail, VPC Flow Logs, RDS Performance Insights, and CloudWatch","D. Security Hub with Inspector and Macie for data discovery"], "correct_answer": "C", "explanation": "This combination provides comprehensive logging: CloudTrail for API calls, VPC Flow Logs for network traffic, RDS Performance Insights for database access, and CloudWatch for application and system monitoring."},
    {"question_number": 10027, "question": "An IoT application collects sensor data from millions of devices and needs to process data streams in real-time for anomaly detection. Which architecture provides the BEST performance and scalability?", "options": ["A. Kinesis Data Streams → Lambda → DynamoDB with DAX","B. SQS → ECS Fargate → ElastiCache → RDS","C. API Gateway → Lambda → Kinesis Analytics → S3","D. IoT Core → Kinesis Data Firehose → Redshift"], "correct_answer": "A", "explanation": "Kinesis Data Streams handles millions of records per second, Lambda provides real-time processing with automatic scaling, and DynamoDB with DAX offers microsecond latency for storing and querying anomaly detection results."},
    {"question_number": 10028, "question": "A startup has unpredictable traffic patterns and wants to minimize infrastructure costs while maintaining good performance. Their application consists of a web tier and database. Which architecture is MOST cost-effective?", "options": ["A. ECS Fargate with RDS Aurora Serverless","B. Lambda with API Gateway and DynamoDB On-Demand","C. EC2 Auto Scaling with RDS MySQL","D. Elastic Beanstalk with RDS PostgreSQL"], "correct_answer": "B", "explanation": "Lambda and DynamoDB On-Demand both provide true pay-per-use pricing with automatic scaling, making them ideal for startups with unpredictable traffic patterns and cost constraints."},
    {"question_number": 10029, "question": "A global news website needs to remain available even if an entire AWS region becomes unavailable. The site serves mostly static content with some dynamic user personalization. Which architecture provides the HIGHEST availability?", "options": ["A. CloudFront with multiple S3 buckets as origins in different regions","B. Route 53 with health checks routing to ALBs in multiple regions","C. Global Load Balancer with EC2 instances in multiple regions","D. CloudFront with origin failover to secondary S3 bucket in different region"], "correct_answer": "D", "explanation": "CloudFront with origin failover automatically switches to a secondary S3 bucket in a different region if the primary origin becomes unavailable, providing seamless failover for global content delivery."},
    {"question_number": 10030, "question": "A company wants to implement Zero Trust security principles for their AWS environment. Which combination of services and practices BEST supports this approach?", "options": ["A. VPC with private subnets and VPN access only","B. IAM with least privilege, MFA, GuardDuty, and Security Hub","C. WAF with CloudFront and Network Load Balancer","D. Systems Manager Session Manager and AWS SSO"], "correct_answer": "B", "explanation": "Zero Trust requires continuous verification and least privilege access. IAM with minimal permissions, MFA for authentication, GuardDuty for threat detection, and Security Hub for centralized security management implement core Zero Trust principles."},
    {"question_number": 10031, "question": "A video conferencing application needs to minimize latency for real-time audio/video streams between participants worldwide. Which AWS services combination provides the LOWEST latency?", "options": ["A. CloudFront with WebRTC and EC2 instances at edge locations","B. Global Accelerator with ALB and EC2 instances in multiple regions","C. Route 53 latency-based routing with ECS clusters globally","D. Lambda@Edge with CloudFront for stream processing"], "correct_answer": "B", "explanation": "Global Accelerator uses AWS's global network infrastructure to route traffic through the optimal path, providing up to 60% improvement in performance. ALB and regional EC2 instances handle the actual video conferencing workload with minimal latency."},
    {"question_number": 10032, "question": "A company has a data processing pipeline that runs every Sunday and processes 1TB of data. The processing takes 6 hours using compute-intensive instances. Which approach minimizes costs?", "options": ["A. Reserved Instances running continuously","B. Scheduled scaling with On-Demand instances","C. AWS Batch with Spot Instances","D. Lambda functions with increased memory allocation"], "correct_answer": "C", "explanation": "AWS Batch with Spot Instances is optimal for batch processing workloads. Spot Instances provide up to 90% cost savings, and Batch manages the infrastructure automatically. Lambda has time and memory limitations that make it unsuitable for this workload."},
    {"question_number": 10033, "question": "An e-commerce platform experiences traffic spikes during sales events. The database becomes a bottleneck during peak times. Which solution provides the BEST resilience during traffic spikes?", "options": ["A. Implement database connection pooling and increase instance size","B. Add ElastiCache for Redis for session storage and product catalog caching","C. Create read replicas and implement database sharding","D. Migrate to DynamoDB with Auto Scaling enabled"], "correct_answer": "B", "explanation": "ElastiCache for Redis reduces database load by caching frequently accessed data (product catalogs) and can handle session storage, significantly improving performance during traffic spikes while maintaining data consistency."},
    {"question_number": 10034, "question": "A mobile application needs to allow users to upload photos directly to S3 while ensuring users can only access their own photos. Which approach provides the MOST secure solution?", "options": ["A. Generate presigned URLs with user-specific prefixes in the bucket policy","B. Use Cognito Identity Pools with IAM roles that restrict access to user-specific S3 paths","C. Implement API Gateway with Lambda authorizer for S3 access","D. Use S3 bucket ACLs with user-specific permissions"], "correct_answer": "B", "explanation": "Cognito Identity Pools provide temporary AWS credentials with IAM roles that can include policy variables (${cognito-identity.amazonaws.com:sub}) to restrict access to user-specific S3 paths, providing secure, scalable access control."},
    {"question_number": 10035, "question": "A real-time gaming application requires sub-10ms response times for player actions. The game state needs to be shared among multiple players. Which architecture provides the BEST performance?", "options": ["A. DynamoDB with DAX and Lambda functions","B. ElastiCache for Redis with EC2 instances","C. RDS with read replicas and connection pooling","D. Aurora with Global Database and Aurora Replicas"], "correct_answer": "B", "explanation": "ElastiCache for Redis provides sub-millisecond latency and supports real-time data structures perfect for gaming (sorted sets, pub/sub). EC2 instances give you full control over the application logic and networking optimization needed for gaming."},
    {"question_number": 10036, "question": "A company wants to reduce data transfer costs for their global application that serves 10TB of content monthly to users worldwide. Which strategy provides the GREATEST cost reduction?", "options": ["A. Use CloudFront with S3 origins in multiple regions","B. Implement S3 Transfer Acceleration","C. Use CloudFront with origin shield enabled","D. Create regional S3 buckets with Cross-Region Replication"], "correct_answer": "C", "explanation": "CloudFront with Origin Shield provides an additional caching layer that reduces origin fetches by up to 75%, significantly reducing data transfer costs from the origin while improving performance globally."},
    {"question_number": 10037, "question": "A financial trading application requires exactly-once message processing for trade orders. Messages must be processed in order and the system cannot afford duplicate trades. Which messaging solution is MOST appropriate?", "options": ["A. SQS Standard queue with application-level deduplication","B. SQS FIFO queue with content-based deduplication","C. Amazon MQ with Apache ActiveMQ","D. Kinesis Data Streams with Lambda consumers"], "correct_answer": "B", "explanation": "SQS FIFO queues guarantee exactly-once processing and maintain message order. Content-based deduplication automatically prevents duplicate messages based on message content, perfect for financial trading scenarios."},
    {"question_number": 10038, "question": "A company needs to ensure that all EC2 instances in their environment are compliant with their security baseline configuration. Non-compliant instances should be automatically remediated. Which solution provides automated compliance management?", "options": ["A. AWS Config with remediation actions and Systems Manager","B. CloudTrail with Lambda functions for remediation","C. Inspector with Auto Scaling for instance replacement","D. Security Hub with GuardDuty integration"], "correct_answer": "A", "explanation": "AWS Config continuously monitors resource configurations against compliance rules and can trigger automatic remediation actions using Systems Manager documents to fix non-compliant instances."},
    {"question_number": 10039, "question": "A content management system needs to search through millions of documents with complex queries including full-text search, filters, and aggregations. Which service provides the BEST search performance?", "options": ["A. RDS with full-text search indexes","B. DynamoDB with GSI and scan operations","C. Amazon OpenSearch Service with multiple node types","D. CloudSearch with custom ranking expressions"], "correct_answer": "C", "explanation": "Amazon OpenSearch Service is purpose-built for search workloads, providing distributed full-text search, complex aggregations, and filtering capabilities with horizontal scaling across multiple node types."},
    {"question_number": 10040, "question": "A company runs development and testing workloads that can be interrupted without data loss. These workloads run 8 hours per day, 5 days per week. Which EC2 pricing model provides optimal cost savings?", "options": ["A. On-Demand Instances with scheduled scaling","B. Spot Instances with Spot Fleet","C. Reserved Instances with flexible scheduling","D. Savings Plans with compute flexibility"], "correct_answer": "B", "explanation": "Spot Instances provide up to 90% cost savings and are perfect for interruptible workloads. Spot Fleet automatically manages instance types and AZs to maintain capacity while optimizing costs."},
    {"question_number": 10041, "question": "A microservices application deployed on EKS needs to handle service failures gracefully without affecting the entire application. Which pattern provides the BEST fault isolation?", "options": ["A. Circuit breaker pattern with health checks","B. Retry logic with exponential backoff","C. Bulkhead pattern with resource isolation","D. Service mesh with automatic failover"], "correct_answer": "A", "explanation": "Circuit breaker pattern prevents cascading failures by monitoring service health and stopping requests to failed services, allowing them to recover while protecting the overall system stability."},
    {"question_number": 10042, "question": "A multi-tenant SaaS application needs to ensure complete data isolation between tenants while sharing the same infrastructure. Which approach provides the STRONGEST security boundaries?", "options": ["A. Row-level security in a shared database with tenant ID filtering","B. Separate databases per tenant with encrypted connections","C. Separate AWS accounts per tenant with cross-account roles","D. Application-level tenant isolation with encrypted data"], "correct_answer": "C", "explanation": "Separate AWS accounts provide the strongest isolation boundaries using AWS's native security controls, ensuring complete separation of resources, billing, and access control between tenants."},
    {"question_number": 10043, "question": "A data analytics platform processes large datasets and generates reports. Users expect reports to be available within seconds of request. The platform processes the same queries repeatedly. Which caching strategy is MOST effective?", "options": ["A. CloudFront caching with custom cache behaviors","B. ElastiCache for Redis with query result caching","C. S3 with pre-computed results and lifecycle policies","D. DynamoDB with cached aggregated data"], "correct_answer": "B", "explanation": "ElastiCache for Redis provides sub-millisecond latency for cached query results and supports complex data structures, making it ideal for caching analytical query results that are repeatedly requested."},
    {"question_number": 10044, "question": "A media company stores 100TB of video files that are frequently accessed for the first 30 days, occasionally accessed for the next 90 days, and rarely accessed afterward. Which S3 storage strategy minimizes costs?", "options": ["A. S3 Standard with manual lifecycle transitions","B. S3 Intelligent-Tiering for automatic cost optimization","C. Lifecycle policy: Standard → Standard-IA (30 days) → Glacier (90 days) → Deep Archive (1 year)","D. S3 One Zone-IA for all files with lifecycle to Glacier"], "correct_answer": "C", "explanation": "This lifecycle policy optimizes costs by moving data through appropriate storage classes based on access patterns: Standard for frequent access, Standard-IA for occasional access, and Glacier/Deep Archive for long-term storage."},
    {"question_number": 10045, "question": "An application processes critical financial transactions that must not be lost even if multiple components fail simultaneously. The processing pipeline includes validation, fraud detection, and settlement. Which architecture ensures maximum data durability?", "options": ["A. SQS with DLQ, Lambda functions, and DynamoDB with point-in-time recovery","B. Kinesis Streams, ECS tasks, and RDS with automated backups","C. Step Functions with Lambda, SQS FIFO, and Aurora with Global Database","D. EventBridge with Lambda, SNS, and S3 with Cross-Region Replication"], "correct_answer": "C", "explanation": "Step Functions provide workflow orchestration with built-in error handling, SQS FIFO ensures exactly-once processing, and Aurora Global Database provides cross-region replication with sub-second RPO."},
    {"question_number": 10046, "question": "A healthcare application must encrypt all data with customer-managed keys and maintain detailed key usage logs for compliance audits. Which key management solution meets these requirements?", "options": ["A. AWS KMS with customer-managed keys and CloudTrail integration","B. AWS CloudHSM with custom key management application","C. Application-level encryption with keys stored in Secrets Manager","D. AWS KMS with AWS-managed keys and detailed logging"], "correct_answer": "A", "explanation": "AWS KMS with customer-managed keys allows full control over encryption keys while providing integration with CloudTrail for detailed key usage logging, meeting compliance requirements for healthcare data."},
    {"question_number": 10047, "question": "A mobile game needs to synchronize player state across multiple devices in real-time. The solution should handle millions of concurrent players with minimal latency. Which architecture is MOST suitable?", "options": ["A. API Gateway with Lambda and DynamoDB Global Tables","B. ALB with EC2 instances and ElastiCache Redis Cluster","C. WebSocket API with Lambda and DynamoDB Streams","D. CloudFront with Lambda@Edge and DynamoDB"], "correct_answer": "C", "explanation": "WebSocket API provides real-time bidirectional communication, Lambda handles the synchronization logic, and DynamoDB Streams enable real-time data replication across devices for millions of concurrent players."},
    {"question_number": 10048, "question": "A company wants to migrate their on-premises data warehouse to AWS. The warehouse is used for monthly reporting and ad-hoc analytics queries. Data volume is 50TB and growing. Which solution provides the BEST cost-performance ratio?", "options": ["A. Amazon Redshift with RA3 instances and concurrency scaling","B. S3 with Athena and Glue for ETL processing","C. EMR with Spark and S3 for data storage","D. RDS PostgreSQL with read replicas for analytics"], "correct_answer": "B", "explanation": "S3 with Athena provides serverless analytics with pay-per-query pricing, ideal for periodic reporting. Glue handles ETL with serverless architecture, making it very cost-effective for this usage pattern."},
    {"question_number": 10049, "question": "A global application needs to maintain user sessions across multiple regions with automatic failover. Users should not lose their session data during regional outages. Which solution provides the BEST session management?", "options": ["A. ElastiCache Redis with Global Datastore across regions","B. DynamoDB Global Tables with session data","C. RDS with Cross-Region Read Replicas","D. S3 Cross-Region Replication for session storage"], "correct_answer": "A", "explanation": "ElastiCache Redis Global Datastore provides cross-region replication with sub-second replication lag and automatic failover, ensuring session data is always available during regional outages."},
    {"question_number": 10050, "question": "A company needs to implement API security that includes rate limiting, request validation, and threat protection for their public APIs. Which combination provides comprehensive API security?", "options": ["A. API Gateway with usage plans, request validation, and WAF integration","B. CloudFront with Lambda@Edge and custom security headers","C. ALB with WAF, Shield Advanced, and custom rules","D. API Gateway with Cognito authorizers and CloudTrail logging"], "correct_answer": "A", "explanation": "API Gateway provides built-in rate limiting through usage plans, request validation capabilities, and integrates with WAF for comprehensive threat protection, making it the most complete API security solution."},
    {"question_number": 10051, "question": "A scientific computing application processes large datasets in parallel and requires high-throughput storage with consistent performance. The application reads data sequentially in large blocks. Which storage solution is OPTIMAL?", "options": ["A. EBS GP3 volumes with high IOPS configuration","B. EBS Provisioned IOPS SSD (io2) volumes","C. EFS with Max I/O performance mode","D. FSx for Lustre with S3 integration"], "correct_answer": "D", "explanation": "FSx for Lustre is optimized for high-performance computing workloads requiring high-throughput sequential access. It provides sub-millisecond latencies and can integrate with S3 for data processing workflows."},
    {"question_number": 10052, "question": "A startup needs to minimize costs for their web application infrastructure. The application has unpredictable traffic with potential viral growth. Which architecture provides the LOWEST baseline costs with ability to scale?", "options": ["A. Elastic Beanstalk with Auto Scaling and RDS","B. Lambda with API Gateway and DynamoDB On-Demand","C. ECS Fargate with ALB and Aurora Serverless","D. EC2 t3.nano instances with Auto Scaling"], "correct_answer": "B", "explanation": "Lambda and DynamoDB On-Demand provide true pay-per-use pricing with zero baseline costs. This serverless architecture automatically scales to handle viral growth while minimizing costs during low traffic periods."},
    {"question_number": 10053, "question": "An IoT application collects sensor data that must be processed within 5 minutes of receipt. If processing fails, data should be retried up to 3 times before being stored for manual review. Which architecture handles this requirement BEST?", "options": ["A. Kinesis Data Streams with Lambda and DLQ configuration","B. SQS with visibility timeout and dead letter queue","C. EventBridge with Lambda retry configuration and S3 storage","D. Step Functions with retry policy and error handling"], "correct_answer": "B", "explanation": "SQS provides message retention with configurable visibility timeout for the 5-minute processing window, automatic retry mechanisms, and dead letter queue for messages that fail after 3 attempts."},
    {"question_number": 10054, "question": "A company wants to implement defense in depth for their web application. The application handles sensitive customer data and faces regular DDoS attacks. Which security layers should be implemented?", "options": ["A. CloudFront, WAF, ALB, Security Groups, and NACLs","B. Route 53, Shield Advanced, CloudFront, and API Gateway","C. GuardDuty, Inspector, Config, and CloudTrail","D. IAM, KMS, Secrets Manager, and Parameter Store"], "correct_answer": "A", "explanation": "This combination provides multiple security layers: CloudFront for DDoS protection and caching, WAF for application-layer filtering, ALB for load balancing, Security Groups for instance-level rules, and NACLs for subnet-level control."},
    {"question_number": 10055, "question": "A recommendation engine needs to process user behavior data in real-time and update recommendations instantly. The system handles millions of events per second. Which architecture provides the BEST real-time processing capability?", "options": ["A. Kinesis Data Streams with Kinesis Analytics and Lambda","B. SQS with EC2 Auto Scaling groups","C. Kinesis Data Firehose with S3 and Athena","D. EventBridge with Step Functions orchestration"], "correct_answer": "A", "explanation": "Kinesis Data Streams can handle millions of records per second, Kinesis Analytics processes streaming data in real-time with SQL queries, and Lambda provides immediate response for recommendation updates."},
    {"question_number": 10056, "question": "A company operates a SaaS platform with predictable baseline usage but experiences seasonal traffic spikes of 5x normal volume. Which pricing strategy optimizes costs for both baseline and peak usage?", "options": ["A. Reserved Instances for baseline + On-Demand for spikes","B. Savings Plans for baseline + Spot Instances for spikes","C. All Spot Instances with Auto Scaling","D. Compute Savings Plans with flexible instance types"], "correct_answer": "A", "explanation": "Reserved Instances provide the best cost savings for predictable baseline usage, while On-Demand instances offer immediate availability and flexibility for handling seasonal spikes without long-term commitments."},
    {"question_number": 10057, "question": "A video streaming service needs to ensure uninterrupted playback even when content servers fail. The service delivers content globally and requires automatic failover. Which solution provides the HIGHEST availability?", "options": ["A. CloudFront with multiple S3 buckets as origins","B. CloudFront with origin failover and health checks","C. Global Load Balancer with health checks","D. Route 53 with weighted routing policies"], "correct_answer": "B", "explanation": "CloudFront with origin failover automatically switches to backup origins when primary origins fail, with built-in health checks ensuring seamless content delivery without interruption to video streaming."},
    {"question_number": 10058, "question": "A government application requires data to be encrypted with FIPS 140-2 Level 3 validated hardware security modules and full control over key material. Which AWS service meets these requirements?", "options": ["A. AWS KMS with customer-managed keys","B. AWS CloudHSM with dedicated HSM instances","C. AWS KMS with imported key material","D. AWS Certificate Manager with private certificates"], "correct_answer": "B", "explanation": "AWS CloudHSM provides dedicated, FIPS 140-2 Level 3 validated hardware security modules with exclusive customer control over key material, meeting government-grade security requirements."},
    {"question_number": 10059, "question": "A trading platform requires ultra-low latency for market data processing with deterministic performance. The application cannot tolerate any latency spikes. Which compute option provides the MOST consistent performance?", "options": ["A. EC2 instances with dedicated tenancy and enhanced networking","B. Lambda functions with provisioned concurrency","C. ECS Fargate with CPU and memory reservations","D. EC2 instances with placement groups and SR-IOV"], "correct_answer": "A", "explanation": "Dedicated tenancy ensures no resource sharing with other customers, enhanced networking provides consistent network performance, and EC2 gives full control over the compute environment for deterministic performance."},
    {"question_number": 10060, "question": "A company runs batch jobs that process data overnight and can be interrupted and resumed. The jobs typically run for 4-8 hours. Which strategy provides maximum cost savings?", "options": ["A. Spot Instances with checkpointing and Auto Scaling","B. Reserved Instances scheduled for overnight hours","C. On-Demand instances with scheduled scaling","D. AWS Batch with mixed instance types"], "correct_answer": "A", "explanation": "Spot Instances provide up to 90% cost savings for interruptible workloads. Checkpointing allows jobs to resume from the last saved state if interrupted, maximizing cost efficiency for batch processing."},
    {"question_number": 10061, "question": "A critical database application requires zero data loss and less than 1 minute recovery time objective (RTO). The application spans multiple AWS regions. Which database solution meets these requirements?", "options": ["A. RDS with automated backups and cross-region snapshots","B. Aurora Global Database with fast failover","C. DynamoDB Global Tables with point-in-time recovery","D. Aurora with Aurora Replicas and backtrack"], "correct_answer": "B", "explanation": "Aurora Global Database provides cross-region replication with typically less than 1 second RPO and can failover to a secondary region in under 1 minute, meeting both zero data loss and fast recovery requirements."},
    {"question_number": 10062, "question": "A company needs to ensure that their containerized applications running on EKS are scanned for vulnerabilities and comply with security policies. Which combination provides comprehensive container security?", "options": ["A. ECR image scanning with Inspector and GuardDuty for runtime protection","B. Third-party vulnerability scanners with custom security policies","C. AWS Config with EKS security compliance rules","D. Security Hub with automated remediation workflows"], "correct_answer": "A", "explanation": "ECR provides automated image vulnerability scanning, Inspector offers container assessment capabilities, and GuardDuty provides runtime threat detection for containerized workloads, creating comprehensive container security."},
    {"question_number": 10063, "question": "A content delivery network needs to serve dynamic content with personalization based on user location and device type. The solution should minimize origin server load. Which architecture is MOST efficient?", "options": ["A. CloudFront with Lambda@Edge for dynamic content generation","B. CloudFront with cached responses and origin request policies","C. API Gateway with regional endpoints and caching","D. Global Load Balancer with regional application servers"], "correct_answer": "A", "explanation": "Lambda@Edge runs at CloudFront edge locations, enabling dynamic content generation and personalization close to users while minimizing requests to origin servers, providing optimal performance and reduced origin load."},
    {"question_number": 10064, "question": "A media company needs to store and process 500TB of video content. The content is accessed frequently for the first week, monthly thereafter, and rarely after 6 months. Which storage and processing strategy minimizes costs?", "options": ["A. S3 Standard → Standard-IA → Glacier with EMR for processing","B. S3 Intelligent-Tiering with Athena for analysis","C. EFS with lifecycle management and EC2 for processing","D. S3 Standard → Glacier → Deep Archive with Lambda for processing"], "correct_answer": "B", "explanation": "S3 Intelligent-Tiering automatically moves data between access tiers based on usage patterns, optimizing costs without lifecycle management complexity. Athena provides serverless querying with pay-per-query pricing for cost-effective analysis."},
    {"question_number": 10065, "question": "A financial application processes transactions that must maintain strict ordering and cannot tolerate any message loss. The system needs to handle up to 100,000 transactions per second. Which messaging architecture ensures these requirements?", "options": ["A. Amazon Kinesis Data Streams with multiple shards and Lambda consumers","B. SQS FIFO queues with high throughput mode and batch processing","C. Amazon MQ with Apache ActiveMQ and persistent messaging","D. EventBridge with custom bus and Lambda integrations"], "correct_answer": "A", "explanation": "Kinesis Data Streams maintains strict ordering within shards, provides exactly-once delivery guarantees, and can scale to handle 100,000+ records per second by using multiple shards with appropriate partition keys."}
  ];
  if (window.__LARGE_BANK__ && Array.isArray(window.__LARGE_BANK__.questions)) {
    window.__LARGE_BANK__.questions = window.__LARGE_BANK__.questions.concat(added);
  }
})();

window.__EXAM_TEN__ = {
  "exam": {
    "title": "AWS Solutions Architect Associate (SAA-C03) Practice Exam",
    "total_questions": 65,
    "level": "Advanced",
    "questions": [
      {
        "question_number": 1,
        "question_text": "A financial services company needs to implement a disaster recovery solution for their critical application running on EC2 instances across multiple Availability Zones. The RTO requirement is 4 hours and RPO is 1 hour. The application uses RDS MySQL with automated backups enabled. Which disaster recovery strategy provides the most cost-effective solution while meeting the requirements?",
        "options": {
          "A": "Implement a warm standby in another region with cross-region RDS read replicas and AMI copying",
          "B": "Use pilot light approach with RDS snapshots copied to another region and launch templates",
          "C": "Deploy active-active configuration across two regions with Route 53 health checks",
          "D": "Implement backup and restore using S3 cross-region replication for data and AMI snapshots"
        },
        "correct_answer": "A"
      },
      {
        "question_number": 2,
        "question_text": "A media company processes video files uploaded to S3. The processing workflow involves multiple Lambda functions, ECS tasks, and SQS queues. Processing can take 15-45 minutes per file. The company wants to ensure fault tolerance and automatic retry with exponential backoff. Which AWS service would best orchestrate this workflow?",
        "options": {
          "A": "AWS Step Functions with Standard Workflows",
          "B": "Amazon EventBridge with custom retry logic",
          "C": "AWS Batch with job queues and retry attempts",
          "D": "Amazon Simple Workflow Service (SWF)"
        },
        "correct_answer": "A"
      },
      {
        "question_number": 3,
        "question_text": "An e-commerce application experiences traffic spikes during flash sales, with normal traffic of 1,000 RPS scaling to 50,000 RPS within minutes. The application uses Application Load Balancer, Auto Scaling Groups, and RDS Aurora MySQL. During spikes, the database becomes the bottleneck. What is the most effective solution to handle these traffic patterns?",
        "options": {
          "A": "Enable Aurora Auto Scaling for read replicas and implement connection pooling with RDS Proxy",
          "B": "Migrate to DynamoDB with On-Demand billing and DAX caching",
          "C": "Implement ElastiCache Redis cluster with write-through caching strategy",
          "D": "Use Aurora Serverless v2 with automatic scaling capabilities"
        },
        "correct_answer": "A"
      },
      {
        "question_number": 4,
        "question_text": "A healthcare organization must comply with HIPAA and needs to store patient data with the following requirements: data at rest encryption, data in transit encryption, audit logging of all access, and geographic data residency in the US. The solution should minimize operational overhead. Which combination of services meets these requirements?",
        "options": {
          "A": "S3 with SSE-KMS, CloudTrail, VPC endpoints, and S3 bucket policies restricting to US regions",
          "B": "EFS with encryption, AWS Config, PrivateLink, and cross-region replication disabled",
          "C": "RDS with TDE, CloudWatch Logs, SSL connections, and multi-region deployment",
          "D": "DynamoDB with encryption at rest, CloudTrail, VPC endpoints, and global tables disabled"
        },
        "correct_answer": "A"
      },
      {
        "question_number": 5,
        "question_text": "A company runs a microservices architecture where services need to communicate with each other asynchronously. Messages must be processed exactly once, and the system should handle message ordering within each service partition. Dead letter queues should be implemented for failed messages. Which messaging solution best fits these requirements?",
        "options": {
          "A": "Amazon SQS FIFO queues with message deduplication and dead letter queues",
          "B": "Amazon SNS with SQS FIFO subscribers and retry policies",
          "C": "Amazon Kinesis Data Streams with exactly-once processing semantics",
          "D": "Amazon MSK (Managed Streaming for Apache Kafka) with idempotent producers"
        },
        "correct_answer": "A"
      },
      {
        "question_number": 6,
        "question_text": "A global company wants to deploy a web application that serves users from multiple continents with sub-100ms latency. The application consists of static content, dynamic API calls, and user session data. The backend uses Lambda functions and DynamoDB. What architecture provides the best performance?",
        "options": {
          "A": "CloudFront with edge locations, API Gateway regional endpoints, Lambda@Edge, and DynamoDB Global Tables",
          "B": "Multiple ALBs in different regions, Route 53 latency-based routing, Lambda functions, and cross-region DynamoDB replication",
          "C": "CloudFront with origin failover, API Gateway edge-optimized endpoints, Lambda functions, and DynamoDB with eventual consistency",
          "D": "AWS Global Accelerator, regional API Gateway endpoints, Lambda functions, and DynamoDB with strong consistency"
        },
        "correct_answer": "A"
      },
      {
        "question_number": 7,
        "question_text": "A data analytics company processes log files stored in S3. The processing involves extracting, transforming, and loading data into a data warehouse for analysis. Files arrive continuously throughout the day in various formats (JSON, CSV, Parquet). The solution should be serverless and cost-effective. Which approach is most suitable?",
        "options": {
          "A": "S3 Event Notifications trigger Lambda functions that process files and load data into Redshift using COPY command",
          "B": "S3 Event Notifications trigger Step Functions workflow orchestrating Glue jobs and Redshift Spectrum queries",
          "C": "Use AWS Glue crawlers to catalog data, Glue ETL jobs for processing, and Athena for querying",
          "D": "EventBridge rules trigger ECS Fargate tasks that process files and load data into RDS PostgreSQL"
        },
        "correct_answer": "C"
      },
      {
        "question_number": 8,
        "question_text": "A financial institution needs to implement a secure API that handles sensitive transactions. The API should authenticate users using corporate SAML identity provider, authorize based on fine-grained permissions, implement rate limiting, and log all requests for compliance. Which solution provides the most comprehensive security?",
        "options": {
          "A": "API Gateway with SAML-based custom authorizer, usage plans for throttling, and CloudTrail logging",
          "B": "Application Load Balancer with SAML authentication, Lambda authorizer functions, and WAF rate limiting",
          "C": "API Gateway with Cognito User Pools federated with SAML, resource-based policies, usage plans, and X-Ray tracing",
          "D": "CloudFront with Lambda@Edge for authentication, API Gateway with IAM authorization, and CloudWatch logging"
        },
        "correct_answer": "C"
      },
      {
        "question_number": 9,
        "question_text": "A mobile gaming company experiences unpredictable traffic patterns with sudden spikes during game launches or viral events. The backend uses containers for game logic, real-time leaderboards, and player matching. The infrastructure should auto-scale rapidly and cost-effectively. What container orchestration strategy is most appropriate?",
        "options": {
          "A": "ECS with Fargate, Application Auto Scaling, and CloudWatch custom metrics for scaling triggers",
          "B": "EKS with Cluster Autoscaler, Horizontal Pod Autoscaler, and Vertical Pod Autoscaler",
          "C": "ECS with EC2 instances, target tracking scaling policies, and scheduled scaling actions",
          "D": "Lambda functions with provisioned concurrency and API Gateway caching"
        },
        "correct_answer": "A"
      },
      {
        "question_number": 10,
        "question_text": "A manufacturing company collects IoT sensor data from factory equipment. Data arrives at 10,000 messages per second with each message being 1KB. The system needs real-time analytics, historical data storage for 7 years, and alerting on anomalies. Data older than 30 days should be stored cost-effectively. Which architecture handles these requirements?",
        "options": {
          "A": "Kinesis Data Streams → Kinesis Analytics for real-time processing → S3 with lifecycle policies → CloudWatch alarms",
          "B": "IoT Core → Kinesis Data Firehose → S3 with Intelligent Tiering → Lambda for anomaly detection",
          "C": "Direct Connect → SQS → Lambda processing → DynamoDB with TTL → SNS for alerts",
          "D": "Kinesis Data Streams → Lambda for processing → TimeStream for time-series data → CloudWatch anomaly detection"
        },
        "correct_answer": "A"
      }
    ]
  }
};