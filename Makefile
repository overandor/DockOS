up:
	docker-compose up --build

test:
	pytest -q

seed:
	python packages/database/seed.py
