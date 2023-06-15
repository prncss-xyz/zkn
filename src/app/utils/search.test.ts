import { IQuery, hrefURL, searchToQuery, update } from "./search";

const query0: IQuery = {
  tags: [],
  dir: "",
  kanban: "",
  wordcount: {},
};

describe("searchToQuery", () => {
  it("skip ", () => {
    expect(
      searchToQuery({ a: "asdf", dir: "/notes", tags: "a b", kanban: "w" })
    ).toEqual({ ...query0, dir: "/notes", tags: ["a", "b"], kanban: "w" });
  });
  it("should have default values", () => {
    expect(searchToQuery({})).toEqual(query0);
  });
});

describe("hrefURL", () => {
  it("should convert query object to search string", () => {
    expect(
      hrefURL({
        pathname: "/notes",
        query: query0,
      })
    ).toEqual("/notes");
    expect(
      hrefURL({
        pathname: "/kanban",
        query: {
          ...query0,
          tags: ["a", "b"],
          dir: "b",
          kanban: "c",
        },
      })
    ).toEqual("/kanban?dir=b&tags=a+b&kanban=c");
  });
  it("should discard kanban parameter when pathname is not '/kanban'", () => {
    expect(
      hrefURL({
        pathname: "/notes",
        query: { ...query0, kanban: "c" },
      })
    ).toEqual("/notes");
  });
});

describe("update", () => {
  it("should update query object", () => {
    expect(
      update(
        {
          pathname: "/notes",
          query: { ...query0, tags: ["a"], dir: "tata", kanban: "p" },
        },
        {
          pathname: "/kanban",
          query: { ...query0, tags: ["b"], dir: "toto", kanban: "q" },
        }
      )
    ).toEqual({
      pathname: "/kanban",
      query: { ...query0, tags: ["b"], dir: "toto", kanban: "q" },
    });
  });
  it("should use empty string to erease", () => {
    expect(
      update(
        {
          pathname: "/notes",
          query: { ...query0, tags: ["a"], dir: "tata", kanban: "p" },
        },
        {
          pathname: "",
          query: query0,
        }
      )
    ).toEqual({
      pathname: "",
      query: query0,
    });
  });
  it("should use undefined to keep", () => {
    const query1 = {
      pathname: "/notes",
      query: { ...query0, tags: ["a"], dir: "tata", kanban: "p" },
    };
    expect(update(query1, {})).toEqual(query1);
  });
});
