# JVM Observability 

This document capture JVM-level monitoring design, metrics collection, and Grafana dashboards. 

## Scope 
- Heap usage 
- GC cycles, pause times, reclamation efficiency
- Thread pool metrics 
- Classloader metrics 
- Lock contention and safepoint behavior 
- JIT compiler activities 

## Collector Layer 
A dedicated Spring Boot / Micrometer starter collects: 
- Memory metrics (heap/non-heap)
- GC events 
- Thread pool queues & active threads
- Runtime metrics (CPU time, uptime)

## Dashboards 
The repository will provide: 
- JVM Overview Dashboard
- GC Behavior Dashboard
- Thread Pool Health Dashboard
- Runtime metrics (CPU time, uptime)

These dashboards will later be tied to AI anomaly detection and correlation with service-level SLIs.

