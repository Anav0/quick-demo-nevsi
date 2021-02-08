import type { ApiSource } from "./api/ApiSource";
import { StorageService } from "./services/StorageService";
import { selectedSourcesStorageKey } from "./store/sources";

export function extractNames(arr: ApiSource[]): string[] {
  const names = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    names.push(element.name);
  }
  return names;
}

export function parseSavedSelectedSources(sources: ApiSource[]) {
  const translator: Map<String, ApiSource> = new Map();

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    translator.set(source.name, source);
  }

  let names = JSON.parse(new StorageService().load(selectedSourcesStorageKey));

  if (!names) return new Map();

  let extractedSources: Map<string, ApiSource> = new Map();
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    let storedName = translator.get(name);
    if (storedName) extractedSources.set(name, storedName);
  }

  return extractedSources;
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
