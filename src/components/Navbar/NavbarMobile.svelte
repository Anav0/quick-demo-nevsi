<script>
  import NavbarItem from "./NavbarItem.svelte";
  export let menuItems = [];
</script>

<div>
  <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
    {#each menuItems as item}
      <NavbarItem {...item} />
    {/each}
  </div>
</div>
