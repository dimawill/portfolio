---
title: "Secure Serverless API Foundation"
category: solutions-architecture
summary: "AWS CDK proof of concept for a Cognito-protected notes REST API backed by Lambda and DynamoDB."
awsServices:
  - Amazon Cognito
  - Amazon API Gateway
  - AWS Lambda
  - Amazon DynamoDB
  - Amazon CloudWatch
  - AWS X-Ray
repoUrl: https://github.com/dimawill/serverless-product-foundation
demoUrl: https://github.com/dimawill/serverless-product-foundation
image: /images/serverless-foundation.svg
date: 2026-11-17
---

## Problem

Show a repeatable starting point for a small multi-user API with authenticated routes, tenant-aware data access, basic observability and a clear deployment path—without claiming production readiness.

## Architecture

AWS CDK provisions a Cognito user pool and public CLI app client, a Cognito-authorized API Gateway REST API, a Node.js 20 Lambda for notes CRUD and an on-demand DynamoDB table keyed by JWT `sub` with PITR. Includes CloudWatch alarms and bounded log retention, X-Ray tracing, per-stage throttling, a manual OIDC-based GitHub Actions deploy path and tests. [Architecture SVG](/images/serverless-foundation.svg). WAF is intentionally optional because it has recurring costs.

## Results

**Pending deployment.** Unit tests and CDK assertion tests are provided; no live traffic, measured latency, cost, restore result or deployment result is claimed. After deployment, run the smoke test and add observed findings here. The `demoUrl` points to the proposed repository, not a hosted service.
