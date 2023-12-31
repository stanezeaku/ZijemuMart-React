git pull
yarn run build
pm2 delete "ZijemuMart-web-next-js"
pm2 start npm --name "ZijemuMart-web-next-js" -- start
