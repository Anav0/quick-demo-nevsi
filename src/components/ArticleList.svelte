<script lang="ts">
  import Article from "./Article.svelte";
  import type { ArticleModel } from "../models/ArticleModel";

  export let articles: ArticleModel[] = [];
</script>

<div
  class="w-full relative flex flex-col align-center justify-center container overflow-x-hidden"
>
  {#each articles as article}
    <Article bind:article />
  {/each}
</div>
