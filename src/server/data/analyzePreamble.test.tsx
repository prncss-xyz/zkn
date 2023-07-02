import { analyzePreamble } from "./analyzePreamble";
import { FileEntry, mergeDefaults } from "./scanFiles";

const entry: FileEntry = {
  id: "",
  mtime: new Date(0),
};

describe("analyzeData", async () => {
  it("should parse with default values", async () => {
    expect(mergeDefaults(analyzePreamble(entry, {}))).toEqual(
      mergeDefaults({ entry })
    );
  });

  it("should parse simple values", async () => {
    expect(
      mergeDefaults(
        analyzePreamble(entry, {
          title: "chaise",
          tags: ["a", "b"],
        })
      )
    ).toEqual(
      mergeDefaults({
        entry: {
          ...entry,
        },
        tags: ["a", "b"],
      })
    );
  });

  it("should convert string to singleton array in tag field", async () => {
    expect(mergeDefaults(analyzePreamble(entry, { tags: "a" }))).toEqual(
      mergeDefaults({
        entry: {
          ...entry,
        },
        tags: ["a"],
      })
    );
  });

  it("should parse date ranges", async () => {
    expect(
      mergeDefaults(
        analyzePreamble(entry, {
          event: {
            start: new Date("2020-10-10"),
            end: new Date("2020-10-11"),
          },
        })
      )
    ).toEqual(
      mergeDefaults({
        entry,
        event: {
          start: new Date("2020-10-10"),
          end: new Date("2020-10-11"),
        },
      })
    );
  });
  it("should parse fullday date ranges", async () => {
    expect(
      mergeDefaults(
        analyzePreamble(entry, {
          event: {
            start: new Date("2020-10-10"),
            day: true,
          },
        })
      )
    ).toEqual(
      mergeDefaults({
        entry,
        event: {
          start: new Date("2020-10-10"),
          end: new Date("2020-10-11"),
        },
      })
    );
  });
  it("should convert simple date to range", async () => {
    expect(
      mergeDefaults(
        analyzePreamble(entry, {
          event: new Date("2020-10-10 00:00"),
        })
      )
    ).toEqual(
      mergeDefaults({
        entry,
        event: {
          start: new Date("2020-10-10 00:00"),
          end: new Date("2020-10-10 01:00"),
        },
      })
    );
  });

  it("should add a default day value", async () => {
    expect(
      mergeDefaults(
        analyzePreamble(entry, {
          event: {
            start: new Date("2020-10-10"),
            end: new Date("2020-10-11"),
          },
        })
      )
    ).toEqual(
      mergeDefaults({
        entry,
        event: {
          start: new Date("2020-10-10"),
          end: new Date("2020-10-11"),
        },
      })
    );
  });

  it("should reject illegal values", async () => {
    expect(async () => {
      analyzePreamble(entry, "-");
    }).rejects.toThrowError();

    expect(async () => {
      analyzePreamble(entry, "event: caca");
    }).rejects.toThrowError();
  });
});
