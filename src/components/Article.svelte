<script lang="ts">
  import type { ArticleModel } from "../models/ArticleModel";
  import Tag from "../components/Tag.svelte";

  export let article: ArticleModel = undefined;

  let isMobile = true;

  let mobileDateFormat = {
    year: "numeric",
    day: "numeric",
    month: "numeric",
  };
  let desktopDateFormat = {
    year: "numeric",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  };
  function onResize() {
    isMobile = window.innerWidth <= 450;
  }
</script>

<svelte:window on:resize={onResize} />
<div class="lg:max-w-3xl mt-6 px-10 py-6 bg-white rounded-lg shadow-md">
  <div class="flex justify-between items-center">
    <a
      href={article.authorUrl ?? article.url}
      target="_blank"
      rel="noopener noreferrer"
      class="mb-1 flex items-center"
    >
      {#if article.avatar}
        <img
          src={article.avatar}
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
        >{article.date.toLocaleString(
          "en",
          isMobile ? mobileDateFormat : desktopDateFormat
        )}</span
      >
    </div>
  </div>
  <div class="mt-2">
    <a
      href={article.url}
      rel="noopener noreferrer"
      target="_blank"
      class="text-xl md:text-2xl text-gray-700 font-bold hover:underline"
      >{article.title}</a
    >
    <p class="mt-2 text-gray-600">
      {article.desc}
    </p>
  </div>
  <div class="flex justify-between items-center mt-4">
    <div class="flex justify-between items-center">
      <div class="flex justify-center items-center">
        <div class="flex justify-center items-center mr-4">
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span class="cursor-default ml-1 font-thin">
            {article.likes}
          </span>
        </div>
        <div class="flex justify-center items-center">
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <span class="cursor-default ml-1 font-thin">
            {article.comments}
          </span>
        </div>
      </div>
    </div>
    <div class="hidden md:flex ml-8 md:ml-16 lg:ml-32 overflow-auto">
      {#each article.tags as tag}
        <div class="mr-3">
          <Tag bind:name={tag} />
        </div>
      {/each}
    </div>
  </div>
</div>
