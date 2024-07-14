#!/bin/sh
echo -n "AUTH_SECRET=" > /app/.env
dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64 >> /app/.env
exec "$@"