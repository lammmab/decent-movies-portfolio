<!-- src/lib/prefabs/Topbar.svelte -->
<!-- on every page as per +layout.svelte -->
<div class="topbar">
  <div class="left">
    {#if user}
      <button on:click={accountButton} class="account_button">
        <img src={user.avatarUrl} alt="User Avatar" />
        <span class="userText">{user.name}</span>
      </button>
    {/if}
  </div>
  <div class="center">
    <div class="searchbar">
        <Searchbar callback={accountButton} placeholder="Enter a title"/>
    </div>
    
  </div>
  <div class="right">
    <!-- optional right-side items -->
  </div>
</div>

<Pulldown bind:this={pulldown} 
  offset={60}
  options={menuOptions}
/>

<script lang="ts">
    import type { User,Option } from '$lib/constants.ts';
    import Pulldown from './Pulldown.svelte';
    import { goto } from '$app/navigation';
    import Searchbar from './Searchbar.svelte';

    let pulldown: Pulldown
    function log() {
        console.log("Hi");
    }

    const menuOptions: Option[] = [
        { label: 'Backend Plugins', callback: log },
        { label: 'Settings', callback: log },
        { label: 'Log out', callback: log }
    ];

    export let user: User | null = null;
    function accountButton() {
    if (user?.id == -1) {
        pulldown.toggle();
    } else {
        goto("/authenticate");
    }
    }
</script>


<style>
    .account_button {
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: none;
    border: none;
    cursor: pointer;
    scale: 1;
    transition: scale 0.3s ease;
    }

    .account_button:hover {
    scale: 1.1;
    }

    .topbar {
      position: fixed;
      top: 0;
      width: 100%;
      height: 60px;
      background-color: #080808;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      z-index: 1000;
      gap: 10px;
    }

    .left {
      height: 100%;
      align-content: center;
    }

    .center {
      position: absolute;
      width: 25vw;
      left: 50%;
      transform: translateX(-50%);
    }

    .center .searchbar {
        width: 25vw; 
    }

    .userText {
    color: #fff;
    font-family: 'NeoSansRegular';
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
