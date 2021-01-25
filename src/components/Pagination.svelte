<script lang="ts">
  export let start: number = 0;
  export let perPage: number = 0;
</script>

<div class="flex justify-evenly w-full mt-8">
  <a
    href="#"
    class="mx-1 px-3 py-2 bg-white text-gray-500 font-medium rounded-md {start <=
    0
      ? 'cursor-not-allowed'
      : ''}"> Newer </a>
  <a
    href="#"
    class="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
    Older
  </a>
</div>
