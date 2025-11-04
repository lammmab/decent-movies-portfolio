<!--
+page.svelte
the entry point of the site
- displays backend connection prompt if there's no user account, OR if the user account has no saved backends
- attempts to connect to backends with a test handshake, optionally a backend password

-->

<script lang="ts">
  import { onMount } from "svelte";
  import Loading from "$lib/prefabs/Loading.svelte";

  import type { User } from "$lib/userstore.ts";
  import { testUser } from "$lib/userstore.ts";
  import Topbar from "$lib/prefabs/Topbar.svelte";
  
  let isLoading = true;
  let user: User | null = null;

  onMount(async () => {
    user = testUser();
    isLoading = false;
  });
</script>

{#if isLoading}
  <Loading message="Loading..." />
{/if}

<Topbar {user} />

<main>
<h1 class="message">Decentralized Movies</h1>
</main>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: rgb(36, 36, 36);
    overflow: hidden;
  }

  .message {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    display: flex;
    justify-content: center;
    margin-top: calc(10vh);
  }

  h1 {
    color: white;
  }
</style>