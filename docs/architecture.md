# Architecture 
This document provides the end-to-end architecture of the observability platform.

## High-Level Flow 
Microservices (JVM / Spring Boot)
 -> 
Prometheus -> TSDB (Thanos / Cortex)
-> 
Grafana Dashboards 
-> 
-----------------------------------------------  
           Observability AI Layer  
-----------------------------------------------  
-> 
Logs (ES/OpenSearch) <-> Metric (TSDB)
->
Data Ingestion (Batch + Streaming)
-> 
Feature Extraction / Normalization 
-> 
Unified Feature Store 
-> ML Training & Fine-tuning
-> Inference API 
-> Intelligent Incident Diagosis & Insights 
-> Each sybsystem is documented in its own module for clarity. 

