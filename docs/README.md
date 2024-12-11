# Structurizr DSL (domain specific language)

## Start a development web server

There are 2 options:

- [structurizr-site-generatr](https://github.com/avisi-cloud/structurizr-site-generatr)
- [structurizr-lite](https://docs.structurizr.com/lite/quickstart)

### Structurizr Site Generator

#### Development web server

```sh
docker run -it --rm -v $(pwd):/var/model -p 8080:8080 ghcr.io/avisi-cloud/structurizr-site-generatr serve --workspace-file workspace.dsl --assets-dir assets
```

#### Generate static site

```sh
docker run -it --rm -v $(pwd):/var/model ghcr.io/avisi-cloud/structurizr-site-generatr generate-site --workspace-file workspace.dsl --assets-dir assets
```

By default, the generated website will be placed in ./build, which is overwritten if it already exisits.

### Structurizr Lite

```sh
docker run -it --rm -p 8080:8080 -v $(pwd):/usr/local/structurizr structurizr/lite
```

#### Workspace filename

```
docker run -it --rm -p 8080:8080 -v $(pwd):/usr/local/structurizr -e STRUCTURIZR_WORKSPACE_FILENAME=infra structurizr/lite
```

# Documenting Architecture Decisions

We will use Architecture Decision Records, as described [by Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

## ADR Tools

- Install [ADR](https://github.com/npryce/adr-tools/blob/master/INSTALL.md) tool.
- Initialize `adr init ./adrs`.
- Add new record `adr new Your Description Here`.

Find out more [here](https://github.com/npryce/adr-tools).

## Deployment

This image is using same repository with frontend but different tag. So, it will not auto spin up new deployed image.
Please go to Github Actions to see the new release tag and manually update on development server.
