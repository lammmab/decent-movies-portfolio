<script lang="ts">
    import TitleCard from "$lib/prefabs/TitleCard.svelte";
    import type {Field,Title} from "$lib/constants.ts";
    import Form from '$lib/prefabs/Form.svelte';
    import TitleRow from "$lib/prefabs/TitleRow.svelte";

    const title: Title = {
        title_name: "The Amazing World of Gumball",
        type: 2,
        display_url: "https://i0.wp.com/www.thewrap.com/wp-content/uploads/2021/09/The-Amazing-World-of-Gumball.jpg?fit=990%2C557&quality=89&ssl=1"
    }

    const fields: Field[] = [
        { name: 'backend', label: 'BACKEND ADDRESS', placeholder: 'Enter an ip or url' },
        { name: 'password', label: 'PASSWORD', type: 'password', placeholder: 'Enter a password (or leave blank)' },
    ];

    const handleSubmit = (data: Record<string, any>) =>
        console.log(data);
</script>
<!--
+page.svelte
the entry point of the site
- displays backend connection prompt if there's no user account, OR if the user account has no saved backends
- attempts to connect to backends with a test handshake, optionally a backend password
-->

<main>
<img class="logo" src="/images/wide_logo.png" alt="Logo" />


</main>

<div class="home">
    <TitleRow
        row_label = "Jump back in"
        titles = {[title,title,title,title,title,title,title,title,title,title,title,title,title,title,title]}
    />
    <TitleRow
        row_label = "Another test"
        titles = {[title,title,title,title,title,title,title,title,title,title,title,title,title,title,title]}
    />
</div>

<!--
<div class="backend">
    <Form {fields} onSubmit={handleSubmit} />
</div>
-->

<style>
    .home {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* children keep their natural width */
        min-height: calc(100vh - 100px);
    }

    .logo {
        display: block;
        margin: 0 auto;
        margin-top: calc(10vh);
    }

    /*.backend {
        display: block;
        margin: 0 auto;
        transform: translate(0,75%);
    }*/
</style>