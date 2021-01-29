<script lang="ts">
  import Selectors from "./Selectors.svelte";
  import { createEventDispatcher } from "svelte";
  import type { SortingOption } from "../models/SortingOption";

  const dispatch = createEventDispatcher();
  export let sortingOption: SortingOption[] = [];
</script>

<header class="bg-white shadow">
  <div
    class="flex items-center justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
  >
    <h1 class="text-3xl font-bold leading-tight text-gray-900">Nevsi</h1>
    <Selectors
      bind:sortingOption
      on:sortingChanged={(e) => {
        dispatch("sortingChanged", e.detail);
      }}
    />
  </div>
</header>
