import { Store } from "@/types";

export function getProcessedStores({
  stores,
  searchTerm,
  category,
  sortOption,
  lang,
}: {
  stores: Store[];
  searchTerm: string;
  category: number | "";
  sortOption: string;
  lang: "fa" | "en";
}): Store[] {
  const filteredStores = stores.filter((store) => {
    const term = searchTerm.trim().toLowerCase();
    const nameToSearch = lang === "fa" ? store.name : store.name_en;

    const matchesSearch = term
      ? nameToSearch.toLowerCase().includes(term)
      : true;

    const matchesCategory = category ? store.category_id === category : true;

    return matchesSearch && matchesCategory;
  });

  const sortedStores = [...filteredStores];
  sortedStores.sort((a, b) => {
    const nameA = lang === "fa" ? a.name : a.name_en;
    const nameB = lang === "fa" ? b.name : b.name_en;

    switch (sortOption) {
      case "name-asc":
        return nameA.localeCompare(nameB, lang);
      case "name-desc":
        return nameB.localeCompare(nameA, lang);
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return sortedStores;
}
