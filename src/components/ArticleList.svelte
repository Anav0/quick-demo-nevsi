<script lang="ts">
  import Article from "./Article.svelte";
  import type { ArticleModel } from "../models/ArticleModel";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";

  export let articles: ArticleModel[] = [];
</script>

<div
  transition:fade={{ duration: 2000 }}
  class="relative flex flex-col align-center justify-center"
>
  {#each articles as article (article.title)}
    <div animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}>
      <Article bind:article />
    </div>
  {/each}
</div>
