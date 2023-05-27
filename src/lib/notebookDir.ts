const dir = process.env.ZK_NOTEBOOK_DIR;
if (!dir) throw new Error("env variable ZK_NOTEBOOK_DIR must be defined");
export const notebookDir = dir;
