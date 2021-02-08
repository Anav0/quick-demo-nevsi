<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let header = "";
  export let desc = "";
</script>

<div
  in:fly={{ duration: 250, y: -25, x: 25 }}
  out:fly={{ duration: 250, y: -25, x: 25 }}
  class="fixed z-10 top-24 sm:right-4 overflow-y-auto"
>
  <div
    class="inline-block align-bottom  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
  >
    <svg
      on:click={() => {
        dispatch("close");
      }}
      class="h-5 text-red-900 cursor-pointer absolute top-4 right-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>

    <div class="bg-red-500 px-4 pt-5 pb-4 sm:p-6">
      <div class="flex items-start">
        <div
          class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full mx-0"
        >
          <svg
            class="h-12 sm:h-10 text-red-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div class="text-white mt-0 ml-4 text-left">
          <h3
            class="text-lg text-white leading-6 font-bold"
            id="modal-headline"
          >
            {header}
          </h3>
          <div class="mt-2">
            <p class="text-sm text-medium text-gray-100">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
