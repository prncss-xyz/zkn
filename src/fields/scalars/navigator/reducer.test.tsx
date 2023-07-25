import { defaultSort, scalars } from "../opts";
import { IState, reducer } from "./reducer";
import R from "rambda";

const scalar0 = { lte: "", gte: "", some: false };
const scalars0 = Object.fromEntries(scalars.map((scalar) => [scalar, scalar0]));
const state0: IState = {
  sort: defaultSort,
  scalars: scalars0,
};

describe("reducer", () => {
  describe("TOGGLE_SOME", () => {
    const on = R.assocPath("scalars.event.some", true, state0) as IState;
    it("should activate scalar (some) when not activated", () => {
      expect(
        reducer(state0, {
          type: "TOGGLE_SOME",
          scalar: "event",
        })[0]
      ).toEqual(on);
    });
    it("should deactivate salar (clearing all fields) when activated", () => {
      expect(
        reducer(R.assocPath("scalars.event.lte", "2020", on), {
          type: "TOGGLE_SOME",
          scalar: "event",
        })[0]
      ).toEqual(state0);
    });
    it("should revert to default sort when disabling current sort scalar", () => {
      expect(
        reducer(
          {
            sort: { scalar: "event", asc: true },
            scalars: {
              ...scalars0,
              event: { gte: "2020", lte: "2030", some: true },
            },
          },
          { type: "TOGGLE_SOME", scalar: "event" }
        )[0]
      ).toEqual(state0);
    });
  });
  describe("PUSH_BOUND", () => {
    it("should preaserve values if interval is valid", () => {
      const init = R.assocPath(
        "scalars.wordcount",
        { gte: "3", lte: "5", some: true },
        state0
      ) as IState;
      expect(
        reducer(init, {
          type: "PUSH_BOUND",
          scalar: "wordcount",
          bound: "lte",
        })[0]
      ).toEqual(init);
    });
    it("should preaserve specified bound (clearing the other) if necessary to make a valid inverval", () => {
      const init = R.assocPath(
        "scalars.wordcount",
        { gte: "5", lte: "3", some: true },
        state0
      ) as IState;
      expect(
        reducer(init, {
          type: "PUSH_BOUND",
          scalar: "wordcount",
          bound: "lte",
        })[0]
      ).toEqual(
        R.assocPath(
          "scalars.wordcount",
          { gte: "", lte: "3", some: true },
          state0
        )
      );
      expect(
        reducer(init, {
          type: "PUSH_BOUND",
          scalar: "wordcount",
          bound: "gte",
        })[0]
      ).toEqual(
        R.assocPath(
          "scalars.wordcount",
          { gte: "5", lte: "", some: true },
          state0
        )
      );
    });
  });
  describe("SET_BOUND", () => {
    it("should update given bound of given scalar to given value", () => {
      expect(
        reducer(state0, {
          type: "SET_BOUND",
          scalar: "event",
          bound: "lte",
          value: "2020",
        })[0]
      ).toEqual(
        R.assocPath(
          "scalars.event",
          { lte: "2020", gte: "", some: true },
          state0
        )
      );
    });
  });
  describe("TOGGLE_SORT", () => {
    const on = R.assocPath(
      "sort",
      { scalar: "event", asc: true },
      state0
    ) as IState;
    it("should activate sort when not active", () => {
      expect(
        reducer(state0, {
          type: "TOGGLE_SORT",
          scalar: "event",
          asc: true,
        })[0]
      ).toEqual(R.assocPath("scalars.event.some", true, on));
    });
    it("should revert to default sort when toggling active sort", () => {
      expect(
        reducer(on, {
          type: "TOGGLE_SORT",
          scalar: "event",
          asc: true,
        })[0]
      ).toEqual(state0);
    });
  });
});
