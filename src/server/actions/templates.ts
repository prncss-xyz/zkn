import os from "os";

export function editNoteTemplate() {
  let template = process.env.ZK_EDIT;
  if (os.platform() === "darwin") template ??= "open %F";
  if (os.platform() === "linux") template ??= "xdg-open %F";
  return template;
}

export function deleteNoteTemplate() {
  let template = process.env.ZK_GALLERY;
  return template;
}

export function openGalleryTemplate() {
  let template = process.env.ZK_GALLERY;
  if (os.platform() === "darwin") template ??= "open %F";
  if (os.platform() === "linux") template ??= "xdg-open %F";
  return template;
}

export function openAssetTemplate() {
  let template = process.env.ZK_EDIT;
  if (os.platform() === "darwin") template ??= "open %F";
  if (os.platform() === "linux") template ??= "xdg-open %F";
  return template;
}
