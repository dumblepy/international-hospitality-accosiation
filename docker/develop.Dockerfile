FROM ubuntu:26.04

RUN apt update && \
    apt upgrade -y && \
    apt install -y \
      build-essential \
      curl \
      git \
      vim

RUN apt autoremove -y

# nodejs
# https://nodejs.org/en/download/prebuilt-binaries
WORKDIR /root
ARG NODE_VERSION=24.20.0
RUN curl -OL https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz
RUN tar -xvf node-v${NODE_VERSION}-linux-x64.tar.xz
RUN rm node-v${NODE_VERSION}-linux-x64.tar.xz
RUN mv node-v${NODE_VERSION}-linux-x64 .node
ENV PATH $PATH:/root/.node/bin

# pnpm
RUN curl -fsSL https://get.pnpm.io/install.sh | bash -s -- -y

RUN git config --global --add safe.directory /application
WORKDIR /application