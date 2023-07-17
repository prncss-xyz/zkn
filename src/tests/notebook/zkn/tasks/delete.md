---
tags: [w/backlog, g/fix]
since: 2020-10-10
until: 2024-10-10
---

# Deletion issue

Sometimes after note is deleted, we get:

```
Foreign key constraint failed on the field: `foreign key`
    at async remove (./src/lib/data/scanFiles.ts:92:5)
    at async Promise.all (index 0)
    at async scanFiles (./src/lib/data/scanFiles.ts:150:26)
    at async setup_ (./src/lib/data/scanFiles.ts:178:5)
    at async Page (note/[...path]/page.tsx:263:5)
```

and need to wipe out database and restrart:

`rm prisma/dev.db; pnpm prisma db push`
