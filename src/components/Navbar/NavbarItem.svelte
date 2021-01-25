<script>
  export let isSelected = false;
  export let link = "";
  export let name = "";
  let style = " rounded-md block font-bold text-base px-3 py-2";
</script>

<a
  class={(isSelected ? "ring ring-indigo-500 text-indigo-800" : "") + style}
  href={link}>{name}</a
>
