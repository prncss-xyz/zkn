# Basic concepts

This is a companion app strcitly use to view notes I write in a text editor.

I want to manage general knowledge (zettelkasten method) and tasks (Getting Things Done method) in the same place.

All data is stored in markdown files with yaml preamble. It is a well known format used by many applications such as Obsidian, Zettlr, editor extensions (I use [zk.nvim](https://github.com/mickael-menu/zk-nvim)), static site generators.

Having data stored in flat files make it easy to sync with syncthing or version control with git.

## Technologies

It is a desktop app implemented with web technologies. This is typically done with electron or tauri. I choose to implemet it with a web server (Next.js) for the sake of lightweightness and to be able tu use my browser extensions within the app.

Simple access model: any request not from `localhost` are blocked

An sqlite database is used for caching and indexing purpose, it can be deleted at any moment without loss of information.
