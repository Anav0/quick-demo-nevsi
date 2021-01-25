<script lang="ts">
  import type { ArticleModel } from "../models/ArticleModel";
  import Tag from "../components/Tag.svelte";

  export let article: ArticleModel = undefined;
</script>

<div class="mt-6">
  <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        class="mb-1 flex items-center">
        {#if article.authorUrl}
          <img
            src={article.authorUrl}
            alt="avatar"
            class="mr-4 w-8 h-8 object-cover rounded-full hidden sm:block"
          />
        {/if}
        <h1 class="text-gray-700 font-bold hover:underline">
          {article.author}
        </h1>
      </a>
      <div>
        <span class="font-light text-gray-600"
          >{article.date.toLocaleString("pl", {
            year: "numeric",
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
          })}</span
        >
      </div>
    </div>
    <div class="mt-2">
      <a
        href={article.url}
        rel="noopener noreferrer"
        target="_blank"
        class="text-2xl text-gray-700 font-bold hover:underline"
        >{article.title}</a
      >
      <p class="mt-2 text-gray-600">
        {article.desc}
      </p>
    </div>
    <div class="flex justify-between items-center mt-4">
      <a
        href={article.url}
        rel="noopener noreferrer"
        target="_blank"
        class="text-blue-500 hover:underline">Read more</a
      >
      <div class="flex ml-16 md:ml-16 lg:ml-32 overflow-x-auto">
        {#each article.tags as tag}
          <div class="mr-3">
            <Tag bind:name={tag} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
