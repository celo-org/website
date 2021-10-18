#!/usr/bin/env bash
# first argument should be service second argument should be version.
gcloud app services set-traffic $1 --splits --migrate $2=1