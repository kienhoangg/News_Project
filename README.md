*IMPORTANT*

**Setup**
1. Cài SQLServer
- Cách 1: Bằng docker
	+ Cài docker
	+ cd đến đường dẫn chứa 2 file docker-compose.yml và docker-compose.override.yml
	+ Chạy docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d --remove-orphans
	+ Để down service chạy: docker-compose down

- Cách 2: Cài tool SQLServer =>> google

2. Migrations DB
B1: dotnet ef migrations add "SampleMigration1" --output-dir Persistence/Migrations
B2: dotnet ef database update

