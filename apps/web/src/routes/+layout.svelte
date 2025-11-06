<script lang="ts">
  
  import favicon from '$lib/assets/favicon.ico';
  import { onMount } from "svelte";
  import Loading from "$lib/prefabs/Loading.svelte";

  import type { User } from "$lib/constants.ts";
  import { AlertType, noUser } from "$lib/constants.ts";
  import Topbar from "$lib/prefabs/Topbar.svelte";
  import Alert from "$lib/prefabs/Alert.svelte";
  
  import "$lib/app.css";

  let { children } = $props();

  let isLoading = $state(true);
  let user: User | null = $state(null);

  onMount(async () => {
    isLoading = false;
    user = noUser();
  });
</script>

{#if isLoading}
  <Loading message="Loading..." />
{/if}

<Topbar {user} />
<Alert 
    message="You have logged in successfully!"
    duration = {2}
    type = {AlertType.SUCCESS}
/>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<style>
  :global(html, body) {

    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: rgb(36, 36, 36);
  }
</style>

{@render children()}
