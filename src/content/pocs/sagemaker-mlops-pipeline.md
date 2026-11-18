---
title: "SageMaker Demand Forecasting MLOps Pipeline"
category: ml-engineering
summary: "CDK-orchestrated XGBoost demand forecasting with synthetic data, held-out RMSE gate, Model Registry, opt-in batch and disabled-by-default endpoint deployment."
awsServices:
  - Amazon SageMaker AI
  - AWS Step Functions
  - AWS Lambda
  - Amazon S3
  - Amazon CloudWatch
  - AWS IAM
repoUrl: https://github.com/dimawill/sagemaker-mlops-pipeline
demoUrl: https://github.com/dimawill/sagemaker-mlops-pipeline
image: /images/ml-mlops-pipeline.svg
date: 2026-11-18
---

## Problem

Show how a repeatable training workflow can reject weak forecasts before publication, without leaving expensive real-time inference running by default. The input is a small, reproducible synthetic daily-demand CSV; it is illustrative, not production demand.

## Architecture

CDK provisions encrypted private input/artifact S3 buckets, a Step Functions state machine, SageMaker XGBoost training and batch evaluation, a Lambda held-out RMSE gate, SageMaker Model Registry, and failure/timeout alarms. An execution can request a second batch transform; a separate CDK flag enables real-time endpoint creation and data capture, default OFF. The Python preparation/metric scripts, tests, architecture diagram and manual OIDC workflow are in the repository. The code repository is published on GitHub. This PoC is not deployed or hosted; there is no live demo.

## Results

**Pending deployment.** Local tests and CloudFormation synthesis demonstrate intended configuration only. No live model accuracy, latency, cost, or SageMaker integration result has been measured. A deployment needs an approved AWS sandbox and teardown review first.
