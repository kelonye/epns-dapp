run: node_modules
	@yarn start

build:
	@yarn build

deploy:
	@yarn build
	@surge -d https://epns.surge.sh -p build

node_modules:
	@yarn

.PHONY: \
	run \
	build \
	deploy
