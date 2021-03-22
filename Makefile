run_prod:
	docker-compose up --build

docker_build:
	docker build -t collact-api .

docker_login:
	aws ecr get-login-password --region ap-northeast-2 --profile collact | docker login --username AWS --password-stdin "$$(aws sts get-caller-identity --query Account --output text).dkr.ecr.ap-northeast-2.amazonaws.com"

docker_push: docker_login docker_build
	docker tag collact-api 297181444089.dkr.ecr.ap-northeast-2.amazonaws.com/collact-api:$(tag)
	docker push 297181444089.dkr.ecr.ap-northeast-2.amazonaws.com/collact-api:$(tag)

