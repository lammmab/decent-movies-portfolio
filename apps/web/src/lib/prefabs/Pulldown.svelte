<script lang="ts">
    import type {Option} from '$lib/constants.ts';
    export let options: Option[];
    export let displayed: boolean = false;    
    export let offset: number = 0;

    export function toggle() {
        displayed = !displayed;
    }
</script>


<div class="pulldown_menu" class:display={displayed} style="top:{offset}px;">
  {#each options as option}
    <button on:click={option.callback} class="option">
        {option.label}
    </button>
  {/each}
</div>

<style>
    .pulldown_menu {
        z-index: 100;
        display: flex;
        flex-direction: column;
        position: fixed;
        background: rgb(14, 14, 14);
        
        width: 9rem;

        height: 10%;
        max-height:500px;

        transition: transform 0.3s ease;
        transform: translateY(-100%);
        overflow: hidden;
    }

    .pulldown_menu.display {
        transform: translateY(0);
    }

    .option {
        color: white;
        flex: 1 1 0;
        width: 100%;
        background: none;
        cursor: pointer;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        border: none;
    }
</style>