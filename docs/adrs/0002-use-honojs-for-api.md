# 2. Choosing Hono.js with Cloudflare Workers

Date: 2024-12-12

## Status

Accepted

## Context

We need a lightweight and fast web framework for our new note-taking application. The framework should support serverless deployment and be easy to work with for both development and deployment.

## Decision

HonoJS will be used for developing the Backend API.

## Consequences

- **Positive:** Hono.js is designed to be ultrafast, making it ideal for high-performance applications.
- **Positive:** Using TypeScript with HonoJS ensures type safety and consistency.
- **Positive:** Cloudflare Workers provide a scalable and reliable edge runtime, allowing us to deploy our application globally with low latency. These workers are functions running at the edge, meaning they are executed closer to the user for faster response times. Using Cloudflare Workers means we can focus on writing code without worrying about server management.

- **Negative:** Need to ensure compatibility of chosen libraries with the Cloudflare Workers environment
