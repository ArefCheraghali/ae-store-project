// src/__tests__/SearchBar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";

// 1. Mock the entire pages/_app module as an ES module.
//    Note the __esModule: true flag so imports get the mock, not the real file.
jest.mock("@/pages/_app", () => {
  const ctx = React.createContext({
    lang: "en" as const,
    toggleLanguage: () => {},
    t: (key: string) => key,
  });
  return {
    __esModule: true,
    LanguageContext: ctx,
  };
});

import * as AppCtx from "@/pages/_app";

describe("SearchBar", () => {
  it("renders placeholder, clears input, and calls onChange correctly", () => {
    const onChange = jest.fn();
    // 2. Use the mocked LanguageContext.Provider
    render(
      <AppCtx.LanguageContext.Provider
        value={{ lang: "en", toggleLanguage: () => {}, t: (k) => k }}
      >
        <SearchBar value="" onChange={onChange} />
      </AppCtx.LanguageContext.Provider>
    );

    // placeholder should be in English
    const input = screen.getByPlaceholderText(/store name\.\.\./i);
    fireEvent.change(input, { target: { value: "Tehran" } });
    expect(onChange).toHaveBeenCalledWith("Tehran");

    // simulate clear button
    fireEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("switches to Persian placeholder when lang is fa", () => {
    const onChange = jest.fn();
    render(
      <AppCtx.LanguageContext.Provider
        value={{ lang: "fa", toggleLanguage: () => {}, t: (k) => k }}
      >
        <SearchBar value="" onChange={onChange} />
      </AppCtx.LanguageContext.Provider>
    );

    screen.getByPlaceholderText("نام فروشگاه...");
  });
});
