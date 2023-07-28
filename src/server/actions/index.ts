"use server";

import { notebookDir } from "@/server/notebookDir";
import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import prisma from "../data/prisma";
import { incFrecency } from "../data/frecency";
import { escapeShell } from "@/utils/escapeShell";
import { exec } from "child_process";
import path from "path";
import {
  deleteNoteTemplate,
  editNoteTemplate,
  openAssetTemplate,
  openGalleryTemplate,
} from "./templates";

export async function getTitle(link: string) {
  const res = await prisma.entry.findUnique({
    where: { id: link },
    select: {
      title: true,
    },
  });
  const title = res?.title ?? link;
  const status = res ? (res.title ? "untitled" : "plain") : "broken";
  return { title, status };
}

const idToLastUpdated = new Map<string, number>();
const updateThreshold = 1000 * 3600;

export async function updateFrecency({ id, frecency }: NoteEntry) {
  const lastUpdated = idToLastUpdated.get(id);
  const now = Date.now();
  if (!lastUpdated || now - lastUpdated > updateThreshold) {
    await prisma.entry.update({
      where: { id },
      data: { frecency: incFrecency(frecency, 1) },
    });
  }
  idToLastUpdated.set(id, now);
}

function execFile(template: string | undefined, filepath: string) {
  if (!template) return;
  const command = template.replace(
    "%F",
    escapeShell(path.join(notebookDir, filepath)),
  );
  exec(command);
}

function execFiles(template: string | undefined, filepaths: string[]) {
  if (!template) return;
  const command = template.replace(
    "%F",
    filepaths
      .map((filepath) => escapeShell(path.join(notebookDir, filepath)))
      .join(" "),
  );
  exec(command);
}

export async function editNote(id: string) {
  const template = editNoteTemplate();
  execFile(template, id);
}

export async function deleteNote(id: string, asset: string | null) {
  const template = deleteNoteTemplate();
  execFile(template, id);
  if (asset) execFile(template, asset);
}

export async function openGallery(ids: string[]) {
  const template = openGalleryTemplate();
  execFiles(template, ids);
}

export async function openAsset(asset: string) {
  const template = openAssetTemplate();
  execFile(template, asset);
}

export async function getIdToTitle(links: string[]) {
  return Object.fromEntries(
    await Promise.all(
      links.map(async (link) => {
        const res = await getTitle(link);
        return [link, res] as const;
      }),
    ),
  );
}
