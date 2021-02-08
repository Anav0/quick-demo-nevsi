<script>
  import { fly, fade } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import { capitalize } from "../helpers";

  let isOpen;
  export let closeOnSelect = true;
  export let header = "";
  export let className = "";

  export function clickOutside(node) {
    const handleClick = (event) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(new CustomEvent("click_outside", node));
      }
    };

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }
</script>

<div
  use:clickOutside
  on:click_outside={(e) => (isOpen = false)}
  class={`${className} relative inline-block text-left`}
>
  <div>
    <button
      on:click={() => (isOpen = !isOpen)}
      type="button"
      class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-indigo-500"
      id="options-menu"
      aria-haspopup="true"
      aria-expanded="true"
    >
      {capitalize(header)}
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>

  {#if isOpen}
    <div
      in:fly={{ y: -8, x: 5, duration: 250, easing: quintInOut }}
      out:fly={{ y: 8, x: -5, duration: 250, easing: quintInOut }}
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <ul
        class="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        on:click={() => (closeOnSelect ? (isOpen = false) : "")}
      >
        <slot />
      </ul>
    </div>
  {/if}
</div>
