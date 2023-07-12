note explorer

# zkn

ZKN is a local web server which offers a convenient way to explore and navigate a collection of notes, structured as flat files with a markdown preamble. As such, it is interoperable with Zettlr,
Obsidian and many other applications. It is designed to be used for both knowledge management (such as _zettelkasten_ method) and task management (such as _Getting Things Done method_).

## Getting Started

Testing stuff, do not install yet! WIP

## Environment variables

- `ZK_NOTEBOOK_DIR` contains the root directory of the notebook
- `DATABASE_URL` contains the path of the database file, prefixed with `file`

## Config file

Configuration is sourced from `.notebook.yaml` file at the root of the notebook.

- `kanbans` contains a directory where each key is the name of a kanban and each value is the list of tags corresponding to the columns of the kanban.
- `reversed_tags` contains a list of reversed tags (notes tagged with a revered tag won't be shown unless tag is selected).

## Note structure

- notes are any markdown `.md` files within the notebook directory (any file or dir starting with a `.` is skipped)
- an optional yaml preamble can contain the following fields
  - `tags`: a list of tags
  - `event`: either a date or an object with a `start` and an optional `end` field

## Source file structure

- `app` contains the pages
- `fields` regroup code around a given property of a note
- `server/actions` contains _nextjs_ server actions
- `server/data` contains code to analyse filesystem and produce database
- `tests` contains the non-unit tests, with `notebook` subfolder containing a sample notebook
- `utils` contains utilities that can be used on both client and server

## Main technologies

- [prisma](https://www.prisma.io/) (with SQLite backend): ORM
- [nextjs](https://nextjs.org/) for the full stack (react server components, server actions)
- [zod](https://zod.dev/): validation
- [vanilla-extract](https://vanilla-extract.style/): styling
- [radix-ui](https://www.radix-ui.com/): headless toolkit
- [unified](https://unifiedjs.com/): markdown and css processing
