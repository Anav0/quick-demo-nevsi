<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";
  import SelectSourcesInfo from "./components/SelectSourcesInfo.svelte";
  import Alert from "./components/Alert.svelte";
  import Visibility from "./components/Visibility.svelte";
  import Header from "./components/Header.svelte";
  import Loader from "./components/Loader.svelte";
  import ArticleList from "./components/ArticleList.svelte";
  import type { ArticleModel } from "./models/ArticleModel";
  import type { ApiSource } from "./api/ApiSource";
  import { StorageService } from "./services/StorageService";
  import {
    alertDesc,
    alertHeader,
    selectedSources,
    selectedSourcesStorageKey,
  } from "./store/sources";
  import { extractNames } from "./helpers";
  import { Order } from "./models/Order";
  import { fly } from "svelte/transition";
  import type { SortingOption } from "./models/SortingOption";
  import settings from "./settings.js";
  import {
    SortByComments,
    SortByDate,
    SortByLikes,
    SortByTitle,
  } from "./models/SortingMethods";

  let isFetching = false;

  let page = settings.start_page;
  let per_page = settings.start_per_page;
  let newArticles: ArticleModel[] = [];
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
    console.log($selectedSources);

    storage.save(selectedSourcesStorageKey, extractNames(elements));
    if (elements.length <= 0) {
      page = settings.start_page;
      displayedArticles = [];
      newArticles = [];
    } else fetchData(elements);
  });

  async function fetchData(sources: ApiSource[]) {
    try {
      isFetching = true;
      newArticles = [];
      for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        source.SetFetchConf(page, per_page);
        newArticles.push(...(await source.GetArticles()));
      }

      displayedArticles = [
        ...displayedArticles,
        ...newArticles.filter((x) => !displayedArticles.includes(x)),
      ];
      sortDisplayedArticles(sorter, Order.Ascending);
    } catch (err) {
      console.error(err);
      $alertHeader = "Fetching error";
      $alertDesc =
        "Error occured while fetching data from one of the sources. Pleas try refreshing this webpage.";
    } finally {
      isFetching = false;
    }
  }
</script>

<Tailwindcss />
<div class="relative bg-gray-200 min-h-screen">
  <div class="sticky top-0 z-30">
    <Header
      bind:sortingOption
      on:sortingChanged={({ detail: sorter }) => {
        sorter = sorter;
        sortDisplayedArticles(sorter, Order.Ascending);
      }}
    />
  </div>
  {#if $alertHeader}
    <Alert
      on:close={() => {
        $alertDesc = "";
        $alertHeader = "";
      }}
      bind:header={$alertHeader}
      bind:desc={$alertDesc}
    />
  {/if}
  <main class="w-full h-full grid place-items-center py-6 px-4 sm:px-6 lg:px-8">
    {#if $selectedSources.size < 1}
      <div out:fly={{ duration: 250, y: -20 }} class="pt-16 md:pt-24 lg:pt-14">
        <SelectSourcesInfo />
      </div>
    {/if}

    {#if $selectedSources.size > 0}
      <div class="min-h-screen" in:fly={{ duration: 500, delay: 250, y: -20 }}>
        <ArticleList bind:articles={displayedArticles} />
      </div>
      <Visibility
        on:loadMore={() => {
          if (isFetching) return;
          page++;
          fetchData([...$selectedSources.values()]);
        }}
      >
        <Loader freq={800} />
      </Visibility>
    {/if}
  </main>
</div>

<style>
</style>
