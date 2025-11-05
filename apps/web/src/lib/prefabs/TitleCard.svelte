<!-- src/lib/prefabs/TitleCard.svelte -->
<script lang="ts">
  import type {Title} from "$lib/constants.ts";
  export let info: Title;
</script>

<div class="title-card">
    <img src={info.display_url} />
    <h3>{info.title_name}</h3>
</div>

<style>
  .title-card {
    display: inline-block;
    margin: 0.5rem;
    padding: 1rem;
    background: #eee;
    border-radius: 0.5rem;
  }

  .title-card:hover {

  }
</style>
