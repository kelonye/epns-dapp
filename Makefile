run: node_modules
	@yarn start

deploy-production:
	@yarn build-production
	@surge -d https://epns.surge.sh -p build

deploy-staging:
	@yarn build-staging
	@surge -d https://epns-staging.surge.sh -p build

node_modules:
	@yarn

.PHONY: \
	run \
	deploy-production \
	deploy-staging
