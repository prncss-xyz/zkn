import mock from "mock-fs";

const file1 = "";

describe("db", () => {
  beforeEach(() => {
    mock({ "1.md": mock.file({ content: file1 }) });
  });
  afterEach(() => {
    mock.restore();
  });
  it("should build an index", async () => {
    init();
  });
});
