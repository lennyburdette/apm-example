set -e

HERE=$(realpath "$(dirname "$0")")

cd $HERE/packages/users
sed -i '' 's/email:/emailAddress:/g' openapi.yaml
apm publish --yes --version 0.2.0
apm tag dev --version 0.2.0
