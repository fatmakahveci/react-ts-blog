import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { isStringList, useStoredState } from "./useStoredState";

afterEach(() => vi.restoreAllMocks());

test("malformed stored JSON and wrong data types fall back safely", () => {
  localStorage.setItem("test", "broken json");
  const first = renderHook(() => useStoredState("test", [], isStringList));
  expect(first.result.current[0]).toEqual([]);
  first.unmount();
  localStorage.setItem("test", JSON.stringify([42]));
  const second = renderHook(() => useStoredState("test", [], isStringList));
  expect(second.result.current[0]).toEqual([]);
});

test("blocked storage does not prevent changing preferences in memory", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("quota");
  });
  const { result } = renderHook(() => useStoredState("test", [], isStringList));
  act(() => result.current[1](["1"]));
  expect(result.current[0]).toEqual(["1"]);
});
