compose-up-initial:
	@docker compose -f docker-compose.initial.yml up --build -d

compose-down-initial:
	@docker compose -f docker-compose.initial.yml down

compose-up-final:
	@docker compose -f docker-compose.final.yml up --build -d

compose-down-final:
	@docker compose -f docker-compose.final.yml down