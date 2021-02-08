import { writable } from "svelte/store";
import type { ApiSource } from "../api/ApiSource";
import { DevTo } from "../api/DevTo";
import { parseSavedSelectedSources } from "../helpers";
import settings from "../settings.js";

export const selectedSourcesStorageKey = "selectedSources";

const initSources = [
  new DevTo(settings.start_page, settings.start_per_page, false),
];
export const sources = writable<ApiSource[]>(initSources);

export const selectedSources = writable<Map<string, ApiSource>>(
  new Map<string, ApiSource>(parseSavedSelectedSources(initSources))
);
