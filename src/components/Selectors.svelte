<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { ApiSource } from "../api/ApiSource";
  import { capitalize, extractNames } from "../helpers";
  import { selectedSources, sources } from "../store/sources";
  import { fly } from "svelte/transition";
  import type { SortingOption } from "../models/SortingOption";
  import Dropdown from "./Dropdown.svelte";

  export let sortingOption: SortingOption[] = [];

  let selectedSortingOption: number = 0;

  const dispatch = createEventDispatcher();

  function unSelectedElements(all: ApiSource[], selected: ApiSource[]) {
    const namesA = extractNames(all);
    const namesB = extractNames(selected);
    return namesA.filter((x) => !namesB.includes(x));
  }

  let unselected = [];

  $: unselected = unSelectedElements($sources, [...$selectedSources.values()]);

  let appearAnimation = { y: -20, duration: 500 };
</script>

<div class="flex justify-end">
  <div class="flex">
    {#each [...$selectedSources] as [name, _] (name)}
      <div
        transition:fly={appearAnimation}
        class="flex overflow-x-auto justify-evenly items-center px-4 py-2 text-gray-100 font-bold mr-2 bg-purple-600 rounded-md"
      >
        <button
          class="h-5 w-5 mr-2"
          on:click={() => {
            $selectedSources.delete(name);
            $selectedSources = $selectedSources;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
  {#if unSelectedElements($sources, [...$selectedSources.values()]).length > 0}
    <Dropdown className="mr-4" header={"Sources"}>
      {#each unselected as name, i (name + i)}
        <li
          class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          on:click={(_) => {
            const pickedName = name;
            if ($selectedSources.get(pickedName)) return;
            let source = $sources.find((x) => x.name == pickedName);
            $selectedSources.set(pickedName, source);
            $selectedSources = $selectedSources;
          }}
        >
          {capitalize(name)}
        </li>
      {/each}
    </Dropdown>
  {/if}
  <Dropdown bind:header={sortingOption[selectedSortingOption].name}>
    {#each sortingOption as option, i (option.name + i)}
      <li
        class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        on:click={(_) => {
          selectedSortingOption = i;
          dispatch("sortingChanged", option);
        }}
      >
        {capitalize(option.name)}
      </li>
    {/each}
  </Dropdown>
</div>
