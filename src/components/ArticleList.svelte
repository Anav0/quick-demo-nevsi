<script lang="ts">
  import Article from "./Article.svelte";
  import type { ArticleModel } from "../models/ArticleModel";
  import { slide, fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  export let articles: ArticleModel[] = [];
</script>

<div class="relative flex flex-col align-center justify-center">
  {#each articles as article (article.title)}
    <div animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}>
      <Article bind:article />
    </div>
  {/each}
</div>
