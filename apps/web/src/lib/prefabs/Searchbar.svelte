<input bind:this={element} class="searchbar" on:keydown={(e) => e.key === 'Enter' && callback(e)} placeholder={placeholder} />

<script lang="ts">
    export let callback: (event: Event) => void;
    export let element: HTMLInputElement | null = null;
    export let placeholder: string = "Text goes here";
</script>

<style>
    .searchbar {
        width: 100%;             /* Full width or adjust as needed */
        max-width: 400px;        /* Optional limit */
        padding: 0.5rem 1rem;    /* Comfortable padding */
        font-size: 1rem;         /* Readable text */
        border: 1px solid #ccc;  /* Light border */
        border-radius: 9999px;   /* Pill-shaped rounded edges */
        outline: none;           /* Remove default focus outline */
        transition: all 0.2s ease; /* Smooth hover/focus effects */
    }

    .searchbar:focus {
        border-color: #007BFF;   /* Highlight on focus */
        box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }

    .searchbar::placeholder {
        color: #aaa;             /* Subtle placeholder color */
        font-style: italic;
    }  
</style>