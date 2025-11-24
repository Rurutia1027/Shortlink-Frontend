# Metrics Foundation 

Prometheus and long-term TSDB form the backbone of the metrics platform.

## Prometheus Recording Rules 
Recording rules will include: 
- CPU/memoryusage 
- Pod restarts 
- Latency histograms
- Error rates 
- Saturation indicators 

## Retention Strategy 
Current baseline retention: 15 days
Extended retention will be stored in Thanos/Cortex for dataset training. 

## Capacity Planning 
This document also covers: 
- Prometheus disk sizing 
- Log retention period 
- Need for HA replicas

