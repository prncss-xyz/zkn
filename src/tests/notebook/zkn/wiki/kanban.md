---
---

# Kanban

A config file in the note directory `.notebook.yaml` describes kanban boards as a list of tags:

As an exemple:

```
kanban:
  workflow:
    - w/backlog
    - w/active
    - w/pending
    - w/completed
    - w/abandonned
  lifecycle:
    - research
    - acquire
    - backlog
    - dispose
```

- When all tags from a workflow starts with the same prefix (ending with '/'), this prefix is removed from column labels.
- Empty columns (relative to current selection) are not displayed.
