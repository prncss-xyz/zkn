#!/usr/bin/env sh

BASE=$(mktemp /tmp/zkn.XXXXXX)
DATABASE_URL=file:"$BASE"
export DATABASE_URL
pnpm prisma migrate dev --name init
if [ "$#" -eq "0" ]; then
	vitest -c ./vitest.config.integration.ts
else
	vitest -c ./vitest.config.integration.ts --ui
fi
# rm "$DATABASE_URL"
