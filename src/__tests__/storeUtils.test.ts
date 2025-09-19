// src/utils/storeUtils.test.ts
import { getProcessedStores } from "@/utils/storeUtils";
import data from "@/data/data.json";
import { Store } from "@/types";

const mockStores = data.stores as Store[];

describe("getProcessedStores", () => {
  it("should filter stores by an English search term", () => {
    const result = getProcessedStores({
      stores: mockStores,
      searchTerm: "Boof",
      category: "",
      sortOption: "name-asc",
      lang: "en",
    });
    expect(result.length).toBe(1);
    expect(result[0].name_en).toContain("Boof");
  });

  it("should filter stores by category ID", () => {
    const result = getProcessedStores({
      stores: mockStores,
      searchTerm: "",
      category: 1,
      sortOption: "name-asc",
      lang: "en",
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((store) => store.category_id === 1)).toBe(true);
  });

  it("should sort stores by rating in descending order", () => {
    const result = getProcessedStores({
      stores: mockStores,
      searchTerm: "",
      category: "",
      sortOption: "rating-desc",
      lang: "en",
    });
    expect(result[0].rating).toBeGreaterThanOrEqual(result[1].rating);
    expect(result[1].rating).toBeGreaterThanOrEqual(result[2].rating);
  });

  it("should return an empty array if no stores match", () => {
    const result = getProcessedStores({
      stores: mockStores,
      searchTerm: "nonexistentstorexyz",
      category: "",
      sortOption: "name-asc",
      lang: "en",
    });
    expect(result.length).toBe(0);
  });
});
