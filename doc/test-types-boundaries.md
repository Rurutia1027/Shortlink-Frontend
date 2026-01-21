# Test Type Boundaries: Integration Test vs Visual Regression vs Playwright E2E

## Overview 
This document clearly distinguishes between **Integration Test**, **Visual Regression Test**, and **Playwright E2E Test**, including their core functionalities, responsibility boundaries, and use cases, to help teams correctly select and use these three testing methods. 

## Core Differences Summary 
| Dimension | Integration Test | Visual Regression Test | Playwright E2E Test |
|-----------|------------------|----------------------|-------------------|
| **Test Type** | Functional Integration Test | Regression Test | End-to-End Functional Test|
| **Core Focus** | Component Collaboration, Functional Integration | Visual Consistency, CSS Regression | User Flow, Critical Path |
| **Test Granularity** | Component Combination Level | Component Level | Page Level, Flow Level|
| **Verification Content** | Functional Logic,  Component Interaction | Visual Appearance, Style Consistency | Complete Flow, Page Navigation|
| **Verification Method** | Functional Assertions | Pixel Comparison (Screen Snapshots) | Functional Assertions, Element Verification |
| **Baseline** | Functional Logic Baseline | Visual Snapshot Baseline | Functional Logic Baseline |
| **Primary Tools** | Jest + React Testing Library | jest-image-snapshot + RTL | Playwright |
| **Runtime Environment** | Jest Test Environment (jsdom) | Jest Test Environment or Browser | Real Browser |
| **Use Cases** | Multi-component Collaboration Verification | Visual Regression Detection | Critical Business Flow Verification |
