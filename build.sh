rm -rf ./build
rm -rf ./dist
mkdir build 
mkdir dist
npx tsc
cp -r ./lib ./build/
cp -r ./bin ./build/
cp ./*.json ./build/
cd ./build
npx pkg . -t node12-macos-x64 -o ../dist/harness-macos-x64
nppx pkg . -t node12-linux-x64 -o ../dist/harness-linux-x64