#!/usr/bin/env bash

# Populate tokenized entries in this repo, building a base instance.
read -p "Site URI (eg. drupal.lib.unb.ca): "  emmr.lib.unb.ca
DEFAULT_SITE_SLUG="$(echo $emmr.lib.unb.ca | cut -d'.' -f1)"
DEFAULT_JIRA_PREFIX="$(echo $DEFAULT_SITE_SLUG | tr '[:lower:]' '[:upper:]')"
read -p "JIRA Prefix (default: $DEFAULT_JIRA_PREFIX): "  EMMR
EMMR=${EMMR:-$DEFAULT_JIRA_PREFIX}
read -p "Site slug (default: $DEFAULT_SITE_SLUG): "  TOKENIZED_LONG_SITE_SLUG
TOKENIZED_LONG_SITE_SLUG=${TOKENIZED_LONG_SITE_SLUG:-$DEFAULT_SITE_SLUG}
emmr=$(echo "$TOKENIZED_LONG_SITE_SLUG" | cut -c -8)
read -p "Site ID (eg. 3096): "  3093

export LC_CTYPE=C
export LANG=C

emmr_lib_unb_ca=$(echo $emmr.lib.unb.ca | sed 's/\./_/g')
emmr.lib.unb.ca=$(echo $emmr.lib.unb.ca | sed 's/\./\\\./g')

rm -rf .git

echo "Setting up:"
echo "$emmr_lib_unb_ca"
echo "$emmr.lib.unb.ca"

# Tokens
find . -type f -print0 | xargs -0 sed -i.bak "s/emmr_lib_unb_ca/$emmr_lib_unb_ca/g"
find . -type f -print0 | xargs -0 sed -i.bak "s/emmr.lib.unb.ca/$emmr.lib.unb.ca/g"
find . -type f -print0 | xargs -0 sed -i.bak "s/emmr.lib.unb.ca/$emmr.lib.unb.ca/g"
find . -type f -print0 | xargs -0 sed -i.bak "s/EMMR/$EMMR/g"
find . -type f -print0 | xargs -0 sed -i.bak "s/emmr/$emmr/g"
find . -type f -print0 | xargs -0 sed -i.bak "s/3093/$3093/g"
find . -name "*.bak" -type f -delete

# Move files
mv custom/themes/instance_theme/instance_theme.info.yml "custom/themes/instance_theme/$emmr_lib_unb_ca.info.yml"
mv custom/themes/instance_theme/instance_theme.libraries.yml "custom/themes/instance_theme/$emmr_lib_unb_ca.libraries.yml"
mv custom/themes/instance_theme "custom/themes/$emmr_lib_unb_ca"

# Readme Shuffle
rm README.md
mv README_instance.md README.md

# Set up new git repo.
git init
git add .
git add -f ./config-yml/.gitkeep
git add -f ./custom/modules/.gitkeep
git add -f ./custom/themes/.gitkeep

git commit -m 'Initial commit from template repo.'

cd ..
mv drupal.lib.unb.ca "$emmr.lib.unb.ca"

echo "Done!\nRun cd ..; cd $emmr.lib.unb.ca; composer install --prefer-dist; dockworker container:start-over to bring the instance up."
