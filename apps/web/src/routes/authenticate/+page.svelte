<script lang="ts">
    import TitleCard from "$lib/prefabs/TitleCard.svelte";
    import type {Field} from "$lib/constants.ts";
    import Form from '$lib/prefabs/Form.svelte';

    const fields: Field[] = [
        { name: 'username', label: 'Username', placeholder: 'Enter a username' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter an email' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter a password' },
    ];

    const handleSubmit = (data: Record<string, any>) =>
        alert('Submitted: ', data);
</script>
<!--
+page.svelte
the entry point of the site
- displays backend connection prompt if there's no user account, OR if the user account has no saved backends
- attempts to connect to backends with a test handshake, optionally a backend password
-->

<main>
<img class="logo" src="/images/wide_logo.png" />
<h1>This is a real login page</h1>
<!--
<TitleCard 
 info = {{
    title_name: "Test Title",
    type: 2,
    display_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrT7oXKTplqRxYMZqclB1V4N0xJVSEU7zqBRdiU_tfu1BRhUrmUrnTnuWf66YQ8t_eEnaM-g&s=10"
  }}

/>
-->

</main>

<Form {fields} onSubmit={handleSubmit} />

<style>
  .logo {
    display: block;
    margin: 0 auto;
    margin-top: calc(10vh);
  }

  h1 {
    color: white;
  }
</style>