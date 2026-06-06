#!/bin/sh
# Exit immediately if a command exits with a non-zero status
set -e
# Start nginx
nginx -g "daemon off;"


#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

# Replace env vars in JavaScript files
echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/app.*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
do
  echo "Processing $file ...";

  sed -i 's|VITE_MATCHES_URL|'${VITE_MATCHES_URL}'|g' $file
  sed -i 's|VITE_INSTANT_URL|'${VITE_INSTANT_URL}'|g' $file
  sed -i 's|VITE_AUTH_URL|'${VITE_AUTH_URL}'|g' $file
  sed -i 's|VITE_BET_URL|'${VITE_BET_URL}'|g' $file
  sed -i 's|VITE_CASINO_URL|'${VITE_CASINO_URL}'|g' $file
  sed -i 's|VITE_AVIATOR_GAME_ID|'${VITE_AVIATOR_GAME_ID}'|g' $file
  sed -i 's|VITE_JETX_GAME_ID|'${VITE_JETX_GAME_ID}'|g' $file
  sed -i 's|VITE_PAYBILL_NO|'${VITE_PAYBILL_NO}'|g' $file
  sed -i 's|VITE_LIVE_POLL_INTERVAL|'${VITE_LIVE_POLL_INTERVAL}'|g' $file

done

echo "Starting Nginx"
nginx -g 'daemon off;'