<div class="setting">
    <h3 class="setting_name">
        {name}
    </h3>
</div>

<script lang="ts">
    import { SettingType } from "$lib/constants";

    export const name: string = "";
    export const type: SettingType = SettingType.INPUT;
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