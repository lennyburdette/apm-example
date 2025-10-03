set -e

HERE=$(realpath "$(dirname "$0")")

cd $HERE/packages/users
apm install
apm publish --yes
apm tag dev

cd $HERE/packages/posts
apm install
apm publish --yes
apm tag dev

cd $HERE/packages/supergraph
apm publish --yes
apm tag dev

cd $HERE/packages/public
apm install
apm publish --yes
apm tag dev

cd $HERE/packages/client-a
apm install
apm publish --yes
apm tag dev

# sed -i '' 's/# email/email/g' operations.graphql
# apm publish --yes
# apm tag dev