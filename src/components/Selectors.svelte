<script lang="ts">
  import type { ApiSource } from "../api/ApiSource";
  import { extractNames } from "../helpers";
  import { selectedSources, sources } from "../store/sources";

  function unSelectedElements(all: ApiSource[], selected: ApiSource[]) {
    const namesA = extractNames(all);
    const namesB = extractNames(selected);

    return namesA.filter((x) => !namesB.includes(x));
  }
</script>

<div class="flex items-center justify-between">
  <h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
  <div class="flex">
    <div class="flex">
      {#each [...$selectedSources] as [name, _]}
        <div
          class="flex overflow-x-auto justify-evenly items-center px-4 py-2 text-gray-100 font-bold mr-2 bg-purple-600 rounded-md"
        >
          <button
            class="h-5 w-5 mr-2"
            on:click={() => {
              $selectedSources.delete(name);
              $selectedSources = $selectedSources;
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <span class="font-bold">{name}</span>
        </div>
      {/each}
    </div>
    <!-- svelte-ignore a11y-no-onchange -->
    {#if unSelectedElements($sources, [
      ...$selectedSources.values(),
    ]).length > 0}
      <select
        class="w-full mr-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300
      focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        {#each unSelectedElements($sources, [
          ...$selectedSources.values(),
        ]) as name}
          <option
            on:click={(_) => {
              const pickedName = name;
              if ($selectedSources.get(pickedName)) return;
              let source = $sources.find((x) => x.name == pickedName);
              $selectedSources.set(pickedName, source);
              $selectedSources = $selectedSources;
            }}>{name}</option
          >
        {/each}
      </select>
    {/if}
    <select
      class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      <option>Latest</option>
    </select>
  </div>
</div>
