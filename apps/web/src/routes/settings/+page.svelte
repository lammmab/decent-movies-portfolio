<script>
    import { SettingType } from "$lib/constants";
    import Setting from "$lib/prefabs/Setting.svelte";

</script>

<main>
<img class="logo" src="/images/wide_logo.png" alt="Logo" />
</main>
<Setting
    name = {"test"}
    type = {SettingType.BUTTON}
></Setting>

<style>
    .logo {
        display: block;
        margin: 0 auto;
        margin-top: calc(10vh);
    }
</style>