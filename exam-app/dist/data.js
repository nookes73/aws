// Question banks loaded at runtime
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

