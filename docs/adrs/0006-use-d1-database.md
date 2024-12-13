# 6. Use of D1 database as serverless database platform

Date: 2024-12-12

## Status

Proposed

## Context

- App need a reliable and scalable database solution for our new project. The database should support serverless architecture, provide robust data management capabilities, and integrate seamlessly with our existing infrastructure.

## Decision

D1 which built on top of SQLite will be used as the database for the application.

## Consequences

- **Positive:** D1 supports serverless architecture, allowing us to build and deploy applications without managing underlying server infrastructure.
- **Positive:** D1 is designed to handle high scalability, making it suitable for applications with varying loads and ensuring performance remains consistent.
- **Positive:** The serverless nature of D1 can lead to cost savings, as we only pay for what we use, avoiding the need for over-provisioning.

- **Negative:** D1, being based on SQLite, supports a limited set of data types compared to other databases like PostgreSQL or MySQL.
