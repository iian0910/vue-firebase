set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/iian0910/vuue-firebase.git master:gh-pages
cd -