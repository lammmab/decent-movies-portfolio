<input bind:this={element} class="searchbar" on:keydown={(e) => e.key === 'Enter' && callback(e)} placeholder={placeholder} />

<script lang="ts">
    export let callback: (event: Event) => void;
    export let element: HTMLInputElement | null = null;
    export let placeholder: string = "Text goes here";
</script>

<style>
    .searchbar {
        width: 100%;
        max-width: 30vw;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 9999px;
        outline: none;
        transition: all 0.2s ease;
    }

    .searchbar:focus {
        border-color: #007BFF;
        box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }

    .searchbar::placeholder {
        color: #aaa;
        font-style: italic;
    }  
</style>