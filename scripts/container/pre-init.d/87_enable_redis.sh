#!/usr/bin/env sh
if [ "$DEPLOY_ENV" == "local" ]; then
  drush --root=${DRUPAL_ROOT} --uri=default --yes en redis
fi
