<!--
$lib/prefabs/TitleRow.svelte

To create:
1. Create titles (example):
const title: Title = {
    title_name: "The Amazing World of Example",
    type: 2, -- 1 is movie, 2 is tv show (TitleType in $lib/constants.ts)
    display_url: "https://example.com"
}
2. Create a title row
- row_label: string
- titles: Title[]
<TitleRow
    row_label = "Jump back in"
    titles = {[title]}
/>
-->

<div class="title-row">
    <h2 class="row-label">{row_label}</h2>
    <div class="scroll-wrapper">
        <button class="scroll-btn left" bind:this={leftBtn} on:click={() => scroll(-1)}>&lt;</button>
        <div class="title-cards-container" bind:this={container}>
            {#each titles as title}
                <div class="title-card">
                    <TitleCard 
                        info={title}
                    />
                </div>
            {/each}
        </div>
        <button class="scroll-btn right" bind:this={rightBtn} on:click={() => scroll(1)}>&gt;</button>
    </div>
</div>

<script lang="ts">
    import type { Title } from "$lib/constants.ts";
    import { onMount } from "svelte";
    import TitleCard from "./TitleCard.svelte";

    export let row_label: string = "Label";
    export let titles: Title[];

    let container: HTMLDivElement;
    let leftBtn: HTMLButtonElement;
    let rightBtn: HTMLButtonElement;

    function scroll(direction: number) {
        const scrollAmount = 300;
        container.scrollBy({
            left: scrollAmount * direction,
            behavior: 'smooth'
        });
        console.log(`Scrolled by ${direction*scrollAmount}`)
    }

    function updateButtons() {
        leftBtn.style.display = container.scrollLeft > 0 ? 'block' : 'none';
        rightBtn.style.display = container.scrollLeft + container.clientWidth < container.scrollWidth ? 'block' : 'none';
    }

    onMount(() => {
        updateButtons();
        container.addEventListener('scroll', updateButtons);
    })
</script>

<style lang="css">
    
    .scroll-btn {
        all: unset;
        cursor: pointer;
        background-color: rgba(0,0,0,.6);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        z-index: 10;
        text-align: center;
        color: rgb(185, 185, 185);

        flex-shrink: 0;
        user-select: none;
        
        transition: all 0.2s ease;
    }

    .scroll-btn.left {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    .scroll-btn.right {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    .scroll-btn:hover {
        cursor: pointer;
        scale: 1.1;
    }

    .scroll-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        overflow: visible;
    }

    .title-row {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
    }

    .row-label {
        color: white;
        font-family: "NeoSansBlack";
        margin-left: 2rem;
    }

    .title-cards-container {
        all: unset;
        display: flex;
        flex-direction: row;
        margin-left: 1rem;
        height: max-content;
        gap: 20px;
        overflow-x: auto;
        scroll-behavior: smooth;
        scrollbar-width: none;
    }

    .title-cards-container::-webkit-scrollbar {
        display: none;
    }

    .title-card {
        flex-shrink: 0;
    }

</style>