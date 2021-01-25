<script>
  import NavbarItem from "./NavbarItem.svelte";
  export let menuItems;
</script>

<div class="flex items-center">
  <div class="flex-shrink-0">
    <img
      class="h-8 w-8"
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
      alt="Workflow"
    />
  </div>
  <div class="hidden md:block">
    <div class="ml-10 flex items-baseline space-x-4">
      {#each menuItems as item}
        <NavbarItem {...item} />
      {/each}
    </div>
  </div>
</div>
