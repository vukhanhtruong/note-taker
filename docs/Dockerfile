FROM ghcr.io/avisi-cloud/structurizr-site-generatr:latest AS builder

WORKDIR /var/model

USER root

COPY . .

RUN /opt/structurizr-site-generatr/bin/structurizr-site-generatr \
    generate-site --workspace-file /var/model/workspace.dsl

FROM nginx:alpine

COPY --from=builder /var/model/build/site /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
