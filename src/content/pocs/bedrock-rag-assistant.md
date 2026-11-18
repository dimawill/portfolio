---
title: "Bedrock RAG Assistant with Source Citations"
category: ai-genai
summary: "CDK PoC for a document-grounded AWS study assistant using Bedrock Knowledge Bases, S3 Vectors and guarded, cited responses."
awsServices:
  - Amazon Bedrock
  - Amazon S3
  - Amazon S3 Vectors
  - AWS Lambda
  - Amazon API Gateway
  - Amazon CloudWatch
repoUrl: https://github.com/dimawill/bedrock-rag-assistant
demoUrl: https://github.com/dimawill/bedrock-rag-assistant
image: /images/genai-rag-assistant.svg
date: 2026-11-18
---

## Problem

A general-purpose assistant can make unsupported claims about AWS architecture. This proof of concept demonstrates retrieval from a small original study-note corpus, explicit refusal without evidence, and traceable S3 source references.

## Architecture

CDK defines a private encrypted S3 documents bucket, a Bedrock Knowledge Base backed by an S3 Vectors index, and an S3 data source synced explicitly by an operator. A throttled, API-key-required API Gateway invokes Node.js 22 Lambda to Retrieve up to four excerpts and Converse with a configurable generation model. Bedrock Guardrails checks PII and a denied topic; answers must cite retrieved excerpt numbers. Logs, alarms, unit/assertion tests, and an expected-source evaluation script round out the PoC. The `demoUrl` is a proposed repository URL, **not** a live demo; no repository has been published.

## Results

**Pending deployment.** Local unit tests and CDK synth validate code and intended resources only. Retrieval quality, citation accuracy, guardrail behavior, latency, costs, and live responses are unmeasured; verify them after sandbox deployment.
