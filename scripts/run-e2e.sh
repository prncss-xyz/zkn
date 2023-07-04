#!/usr/bin/env sh

BASE=$(mktemp /tmp/zkn.XXXXXX)
DATABASE_URL=file:"$BASE"
export DATABASE_URL
pnpm prisma migrate dev --name init
if [ "$#" -eq "0" ]; then
	pnpm exec playwright test
else
	pnpm exec playwright test --ui
fi
rm "$BASE"
