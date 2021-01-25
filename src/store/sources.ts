import { readable, writable } from "svelte/store";
import type { ApiSource } from "../api/ApiSource";
import { DevTo } from "../api/DevTo";
import { Reddit } from "../api/Reddit";
import { parseSavedSelectedSources } from "../helpers";

export const selectedSourcesStorageKey = "selectedSources";

const initSources = [new DevTo(0, 5, false), new Reddit(0, 5, false)];
export const sources = writable<ApiSource[]>(initSources);

export const selectedSources = writable<Map<string, ApiSource>>(
  new Map<string, ApiSource>(parseSavedSelectedSources(initSources))
);
