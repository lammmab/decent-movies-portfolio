<script lang="ts">
  import type { User } from '../userstore.ts';
  export let user: User | null = null;
</script>

<header class="topbar">
  {#if user}
    <img src={user.avatarUrl} alt="User Avatar" />
    <span>{user.name}</span>
  {:else}
    <span>Loading...</span>
  {/if}
</header>

<style>
  .topbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 1000;
  }
  img {
    border-radius: 50%;
    margin-right: 10px;
  }
</style>
