<script>
  import { spring } from "svelte/motion";

  export let freq = 1000;

  let coords = spring(
    { x: 50, y: 50 },
    {
      stiffness: 0.05,
      damping: 0.25,
    }
  );
  let i = 0;

  let span = 15;
  setInterval(() => {
    if (i % 2 == 0) $coords.y += span;
    else $coords.y -= span;

    i++;
    if (i > 100) i = 0;
  }, freq);
</script>

<div class="relative h-20 w-20">
  <div
    style="transform: translateY({$coords.y}px)"
    class="absolute inset-x-0 mx-auto w-4 h-4 rounded-full bg-indigo-500"
  />
</div>
