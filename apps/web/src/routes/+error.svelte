<script>
    import { page } from "$app/state";

</script>
<!--
unauthorized.svelte
you shall not pass
-->

<main class="unauthorized">
    <img class="logo" src="/images/wide_logo.png" alt="Logo" />
    <h1>YOU SHALL NOT PASS!</h1>
    {#if page.error}<h2>{page.status} {page.error.message}</h2>{/if}
</main>

<style>
    .unauthorized {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
    }

    .logo { display: block; margin: 0 auto; margin-top: calc(10vh); }

    h1 {
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(1.5rem, 3vw, 3rem);
        transform: translateY(-50%);
    }
    
    h2 {
        color: rgb(207, 56, 56);
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(1rem, 2vw, 2rem);
        transform: translateY(-200%);
    }
</style>
