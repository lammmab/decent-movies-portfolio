<!-- src/lib/prefabs/TitleCard.svelte -->
<script lang="ts">
  import type {Title} from "$lib/constants.ts";
  export let info: Title;
</script>

<button class="title-card">
    <img class="title-image" src={info.display_url} alt="{info.title_name}" />
    <h3 class="title-info">{info.title_name}</h3>
</button>

<style>
    .title-card {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        
        background: #eee;
        border-radius: 0.5rem;
        height: 20vw;
        height: clamp(150px, 20vw, 300px);

        cursor: pointer;
        border: 2px solid transparent;
        border-radius: 10px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .title-card:hover,
    .title-card:focus {
        border-color: #ec35e3;
        background-color: rgba(255,255,255,0.1);
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }

    .title-image {
        border-radius: 0.5rem;
        width: 100%; height: 100%;
        display: block;
        object-fit: cover;
    }

    .title-info {
        position: absolute;
        color: white;
        font-family: "NeoSansBlack";
        font-size: 20px;
        text-shadow: 0px 0px 100px rgba(0,0,0,0.8);
        align-self: flex-end;
        text-align: center;
    }
</style>
