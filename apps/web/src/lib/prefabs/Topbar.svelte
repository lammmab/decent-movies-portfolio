<!-- src/lib/prefabs/Topbar.svelte -->
<script lang="ts">
  import type { User } from '$lib/constants.ts';
  export let user: User | null = null;
</script>

<div class="topbar">
  {#if user}
    <img src={user.avatarUrl} alt="User Avatar" />
    <span class="userText">{user.name}</span>
  {:else}
    <span>Loading...</span>
  {/if}
</div>

<style>
  .topbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #080808;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 1000;
  }

  .userText {
    color: #fff;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-left: 1%;
  }

  img {
    border-radius: 50%;
    margin-right: 10px;
    size: relative;
    width: 40px;
    height: auto;
  }
</style>
