run: node_modules
	@yarn start

deploy:
	@env-cmd -f .env.production react-scripts build
	@surge -d https://epns.surge.sh -p build

deploy-staging:
	@env-cmd -f .env.staging react-scripts build
	@surge -d https://epns-staging.surge.sh -p build

node_modules:
	@yarn

.PHONY: \
	run \
	deploy \
	deploy-staging
