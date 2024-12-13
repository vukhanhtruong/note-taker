# Structurizr DSL Development Server

This repository provides tools and instructions to help you model and visualize software architecture using **Structurizr DSL** and the **C4 Model**. You can start a development server or generate a static site for your architecture diagrams using the **Structurizr Site Generatr**.

- Based on the blog post: [Visualizing Software Architecture with the C4 Model](https://hihoay.substack.com/p/visualizing-software-architecture)
- [Live Demo](https://vukhanhtruong.github.io/note-taker/master/)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: Required to run the Structurizr Site Generator without local installation.
- **Structurizr DSL**: Your architecture models should be written in `.dsl` files.

---

## Getting Started

### 1. Start a Development Web Server

You can start a local development server to preview your Structurizr DSL workspace in real time. Run the following command:

```sh
cd docs
docker run -it --rm -v $(pwd):/var/model -p 8080:8080 ghcr.io/avisi-cloud/structurizr-site-generatr serve --workspace-file workspace.dsl --assets-dir assets
```

- `workspace.dsl`: The main DSL file for your architecture model.
- `assets`: A directory for additional resources (e.g., images, styles).
- **Access the server**: Once the command runs, open your browser and navigate to http://localhost:8080 to view your architecture diagrams.

### 2. Generate a Static Site

To generate a static website for your Structurizr diagrams, use the following command:

```sh
cd docs
docker run -it --rm -v $(pwd):/var/model ghcr.io/avisi-cloud/structurizr-site-generatr generate-site --workspace-file workspace.dsl --assets-dir assets
```

**Output Directory**: The static site will be generated in the ./build folder.

**Overwrite Behavior**: If the `./build` folder exists, it will be replaced with the newly generated site.
