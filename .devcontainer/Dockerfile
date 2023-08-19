ARG PYTHON_VERSION="3.11"
FROM python:$PYTHON_VERSION-slim-bookworm

RUN apt update && apt install -y zsh curl git vim httpie

ARG NODE_VERSION="20"
RUN curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - && apt install -y nodejs
