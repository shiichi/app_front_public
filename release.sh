
#!/bin/bash
# gitユーザ設定

set -e

git config --global user.email "eigotyoubunn30@gmail.com" #コミットユーザの有効なメールアドレス
git config --global user.name "atyenoria" #コミットユーザの名前

# リリースバージョン名
CI_RELEASE_VERSION=`date +"v%Y%m%d%H%M%S"`
# リリースブランチ名
CI_RELEASE_BRANCH="${LARABEL_BRANCH}"
# リモートリポジトリ
CI_REMOTE_REPOSITORY="${LARABEL_REPO}"
# リリースブランチ作成
git checkout -b ${CI_RELEASE_BRANCH}
#変更ファイルををすべて追加
git add --all :/
#コミット
git commit -m "[auto] release branch (${CI_RELEASE_VERSION})"
#リモートにプッシュ
git push ${CI_REMOTE_REPOSITORY} ${CI_RELEASE_BRANCH}
