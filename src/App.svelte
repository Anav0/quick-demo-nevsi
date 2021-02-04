<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";
  import SelectSourcesInfo from "./components/SelectSourcesInfo.svelte";
  import Header from "./components/Header.svelte";
  import Loader from "./components/Loader.svelte";
  import ArticleList from "./components/ArticleList.svelte";
  import type { ArticleModel } from "./models/ArticleModel";
  import type { ApiSource } from "./api/ApiSource";
  import { StorageService } from "./services/StorageService";
  import { selectedSources, selectedSourcesStorageKey } from "./store/sources";
  import { extractNames } from "./helpers";
  import { Order } from "./models/Order";
  import type { SortingOption } from "./models/SortingOption";
  import {
    SortByComments,
    SortByDate,
    SortByLikes,
    SortByTitle,
  } from "./models/SortingMethods";

  let isFetching = false;
  let drawSvg = false;

  let displayedArticles: ArticleModel[] = [];

  let storage = new StorageService();

  let sortingOption: SortingOption[] = [
    new SortByDate(),
    new SortByTitle(),
    new SortByLikes(),
    new SortByComments(),
  ];

  let sorter: SortingOption = sortingOption[0];

  function sortDisplayedArticles(sorter: SortingOption, order: Order) {
    displayedArticles = sorter.sort(displayedArticles, order);
  }

  selectedSources.subscribe(() => {
    const elements = [...$selectedSources.values()];
    storage.save(selectedSourcesStorageKey, extractNames(elements));
    fetchData(elements);
  });

  async function fetchData(sources: ApiSource[]) {
    displayedArticles = [];
    try {
      isFetching = true;
      for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        displayedArticles = displayedArticles.concat(
          await source.GetArticles()
        );
        sortDisplayedArticles(sorter, Order.Descending);
      }
    } catch (err) {
      console.error(err);
    } finally {
      isFetching = false;
    }
  }
</script>

<Tailwindcss />
<div class="bg-gray-200 min-h-screen">
  <div class="sticky top-0 z-30">
    <Header
      bind:sortingOption
      on:sortingChanged={({ detail: sorter }) => {
        sorter = sorter;
        sortDisplayedArticles(sorter, Order.Descending);
      }}
    />
  </div>
  <main
    class=" w-full h-full grid place-items-center py-6 px-4 sm:px-6 lg:px-8"
  >
    {#if $selectedSources.size < 1}
      <div class="transform scale-75 mt-20">
        <SelectSourcesInfo />
      </div>
    {/if}
    {#if !isFetching}
      <ArticleList bind:articles={displayedArticles} />
    {:else}
      <div class="relative">
        <Loader freq={800} />
      </div>
    {/if}
  </main>
</div>

<style>
</style>
