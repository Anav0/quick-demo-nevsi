<script lang="ts">
  import Tailwindcss from "./Tailwindcss.svelte";
  import Navbar from "./components/Navbar/Navbar.svelte";
  import Header from "./components/Header.svelte";
  import ArticleList from "./components/ArticleList.svelte";
  import Selectors from "./components/Selectors.svelte";
  import type { ArticleModel } from "./models/ArticleModel";
  import { onMount } from "svelte";
  import type { ApiSource } from "./api/ApiSource";
  import { StorageService } from "./services/StorageService";
  import { selectedSources, selectedSourcesStorageKey } from "./store/sources";
  import { extractNames } from "./helpers";

  let isFetching = false;

  let displayedArticles: ArticleModel[] = [];

  let storage = new StorageService();

  selectedSources.subscribe(() => {
    const elements = [...$selectedSources.values()];
    storage.save(selectedSourcesStorageKey, extractNames(elements));
    fetchData(elements);
  });

  async function fetchData(sources: ApiSource[]) {
    displayedArticles = [];
    console.log("fetch");
    try {
      isFetching = true;
      for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        console.log(source);

        displayedArticles = displayedArticles.concat(
          await source.GetArticles()
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      isFetching = false;
    }
  }
</script>

<Tailwindcss />
<div class="w-full h-full">
  <div class="sticky top-0 z-30">
    <Navbar />
    <Header />
  </div>
  <main class="bg-gray-200">
    <div
      class="p-4 max-w-7xl lg:w-8/12 w-full h-full flex flex-col items-center mx-auto py-6 sm:px-6 lg:px-8"
    >
      <div class="w-full">
        <Selectors />
      </div>
      <ArticleList bind:articles={displayedArticles} />
    </div>
  </main>
</div>
