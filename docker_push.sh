#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push roblobob/dopamine-mvp:latest
# docker push roblobob/dopamine-mvp:$TRAVIS_COMMIT
