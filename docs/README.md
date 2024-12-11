# Structurizr DSL Development Server

This repository helps you work with Structurizr DSL to model and visualize software architecture using the C4 Model. It includes instructions for starting a development server and generating a static site using the **Structurizr Site Generator**.

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
**Overwrite Behavior**: If the ./build folder exists, it will be replaced with the newly generated site.

### 3. Deploy to Github pages

```sh
cp -r dsl/build/site/* docs
```

Then push the changes to branch named `gh-pages`
