#!/bin/sh

set -e

git config --global user.email "eigotyoubunn30@gmail.com"
git config --global user.name "atyenoria"


CI_RELEASE_VERSION=`date +"v%Y/%m/%d %H:%M:%S"`
CI_RELEASE_BRANCH="${LARABEL_BRANCH}"
CI_REMOTE_REPOSITORY="${LARABEL_REPO}"
git checkout -b ${CI_RELEASE_BRANCH}
git add --all :/
git commit -m "[auto] release branch (${CI_RELEASE_VERSION})"
git push -f ${CI_REMOTE_REPOSITORY} ${CI_RELEASE_BRANCH}
