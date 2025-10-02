set -e

HERE=$(realpath "$(dirname "$0")")

cd $HERE/packages/users
apm install
apm publish --yes --version 0.1.0
apm tag dev --version 0.1.0

cd $HERE/packages/posts
apm install
apm publish --yes --version 0.1.0
apm tag dev --version 0.1.0

cd $HERE/packages/supergraph
# apm add @example/users#dev
# apm add @example/posts#dev
apm publish --yes --version 0.1.0
apm tag dev --version 0.1.0

cd $HERE/packages/public
apm install
apm publish --yes --version 0.1.0
apm tag dev --version 0.1.0

cd $HERE/packages/client-a
apm install
apm publish --yes --version 0.1.0
apm tag dev --version 0.1.0

sed -i '' 's/# email/email/g' operations.graphql
apm publish --yes --version 0.2.0
apm tag dev --version 0.2.0