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
        console.log('Submitted: ', data);
</script>

<main>
<img class="logo" src="/images/wide_logo.png" alt="Logo" />
<hr>
<h1>Log in</h1>
<Form {fields} onSubmit={handleSubmit} />
</main>



<style>
  .logo {
    display: block;
    margin: 0 auto;
    margin-top: calc(10vh);
  }

  h1 {
    color: white;
    text-align: center;
    font-family: 'NeoSansRegular';
  }

  hr {
    border: none;
    margin-top: 5%;
  }
</style>