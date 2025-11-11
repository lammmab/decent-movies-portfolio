<div class="setting">
    <h3 class="setting_name">
        {name}
    </h3>

    {#if type == SettingType.BUTTON}
    <button title="nothing"></button>
    {:else if type == SettingType.INPUT}
    <input>
    {:else if type == SettingType.DROPDOWN}
    <!--nun for now-->
    {:else if type == SettingType.CHECKBOX}
    <!--also nun for now-->
    {/if}
</div>

<script lang="ts">
    import { SettingType } from "$lib/constants";

    export let name: string;
    export let type: SettingType;
</script>

<style>
    .setting {
        position: relative;
        width: 100%;
        height: 8rem;
    }

    .setting_name {
        color: white;
        font-family: "NeoSansBlack";
    }
</style>