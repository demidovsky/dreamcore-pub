docker run \
  --restart unless-stopped \
  --name dreamcore-db-dev \
  -p 3310:3306 \
  -e MYSQL_ROOT_PASSWORD=P6.......Gwm \
  -e MYSQL_DATABASE=dreamcore_db_dev \
  -d mysql:5.7
