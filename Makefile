gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
test:
	npx jest
install:
	npm ci
test-coverage:
	npm test -- --coverage
