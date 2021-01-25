<script>
  import { DevTo } from "../../api/DevTo";

  import NavbarDesktop from "./NavbarDesktop.svelte";
  import NavbarMobile from "./NavbarMobile.svelte";
  import { onMount } from "svelte";

  let isMenuOpen = false;
  let menuItems = [
    {
      name: "Dashboard",
      link: "/",
      isSelected: true,
    },
    {
      name: "Team",
      link: "/",
      isSelected: false,
    },
  ];

  
</script>

<nav class="bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <NavbarDesktop bind:menuItems />
      <!-- Mobile menu button -->
      <button
        on:click={() => (isMenuOpen = !isMenuOpen)}
        class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-500 focus:ring-indigo-500">
        <span class="sr-only">Open main menu</span>
        <!-- Open Icon -->
        <svg
          class="{isMenuOpen ? 'hidden' : ''} block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <!-- Close Icon -->
        <svg
          class="{isMenuOpen ? 'block' : 'hidden'} h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
  {#if isMenuOpen}
    <NavbarMobile bind:menuItems />
  {/if}
</nav>

<style>
</style>
