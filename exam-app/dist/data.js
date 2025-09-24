// Complete question bank - Part 1 (Questions 1-50)
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
    }
  ]
};

// Additional question bank - Part 2 (Questions 151-200)
window.__LARGE_BANK_PART2__ = {
  "questions": [
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
    }
  ]
};

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