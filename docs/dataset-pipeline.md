# Dataset Pipeline 

This document defines the data ingestin and dataset generation pipeline. 

## Components
### TSDB Metrics Query API 
- Batched scraping windows 
- Downsampling strategy 
- Time-aligned tensor generation 

### Logs Query API (ES/OpenSearch)
- Time-window batching 
- Template extraction 
- Log-derived feature generation 

### Unified Feture Store 
- Parquet or ClickHouse 
- Versioned datasets 
- Combined metrics + logs training samples 

## Output 
- Supervised & unsupervised training datasets
- Correlation-read data for multivariate models