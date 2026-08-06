build:
	npm run build --prefix frontend

start:
	npx start-server -s ./frontend/dist

dev:
	cd frontend && npm run dev

lint:
	cd frontend && npx eslint src/ --ext .js,.jsx

lint-fix:
	cd frontend && npx eslint src/ --ext .js,.jsx --fix