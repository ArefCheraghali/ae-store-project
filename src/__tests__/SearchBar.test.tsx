// src/__tests__/SearchBar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";
import { LanguageContext } from "@/pages/_app";

// Mock the context. No changes needed here, your mock is perfect.
jest.mock("@/pages/_app", () => ({
  __esModule: true,
  LanguageContext: React.createContext({
    lang: "en" as const,
    toggleLanguage: () => {},
    t: (key: string) => key,
  }),
}));

describe("SearchBar", () => {
  it("renders placeholder, calls onChange, and clears input correctly", () => {
    const onChange = jest.fn();

    // Initial render with an empty value
    const { rerender } = render(
      <LanguageContext.Provider
        value={{ lang: "en", toggleLanguage: () => {}, t: (k) => k }}
      >
        <SearchBar value="" onChange={onChange} />
      </LanguageContext.Provider>
    );

    // Get the input element by its placeholder text
    const input = screen.getByPlaceholderText(/store name\.\.\./i);

    // Simulate user typing into the input
    fireEvent.change(input, { target: { value: "Coffee" } });

    // Assert that the onChange function was called with the correct value
    expect(onChange).toHaveBeenCalledWith("Coffee");

    // --- The Fix ---
    // Re-render the component with the new value to make the clear button appear
    rerender(
      <LanguageContext.Provider
        value={{ lang: "en", toggleLanguage: () => {}, t: (k) => k }}
      >
        <SearchBar value="Coffee" onChange={onChange} />
      </LanguageContext.Provider>
    );

    // Now, find the clear button and click it
    // Using `getByRole` is great for accessibility.
    const clearButton = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearButton);

    // Assert that onChange was called with an empty string to clear the input
    expect(onChange).toHaveBeenCalledWith("");
  });

  // Your second test case is perfect, no changes needed!
  it("switches to Persian placeholder when lang is fa", () => {
    const onChange = jest.fn();
    render(
      <LanguageContext.Provider
        value={{ lang: "fa", toggleLanguage: () => {}, t: (k) => k }}
      >
        <SearchBar value="" onChange={onChange} />
      </LanguageContext.Provider>
    );

    expect(
      screen.getByPlaceholderText("نام فروشگاه...")
    ).toBeInTheDocument();
  });
});