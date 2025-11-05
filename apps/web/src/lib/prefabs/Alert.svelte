<!-- src/lib/prefabs/Alert.svelte -->
<!-- 
 Create an alert:
    - message = String error
    - type = Types: WARNING,INFORMATION,SUCCESS,ERROR
    - duration = Duration in seconds
<Alert
    message="Error!"
    type = {AlertType.ERROR}
    duration = {2.0}
/>

-->

<div class="alert {type}" bind:this={element}>
    {message}
</div>

<script lang="ts">
    import {AlertType} from "$lib/constants.ts";
    import { onMount } from "svelte";
    export let message: string = "Warning!";
    export let duration: number = 2.0;
    export let type: AlertType = AlertType.WARNING;

    let element: HTMLDivElement;

    onMount(() => {
        const timeout = setTimeout(() => {
        element.classList.add('slide-out');
        }, duration * 1000);
        return () => clearTimeout(timeout);
    })
</script>

<style lang="css">
    .alert {     
        text-align: center;
        align-content: center;
        height: 60px;
        width: 45%;
        position: fixed;
        z-index: 9999;

        left: 50%;
        transform: translate(-50%);
        border-radius: 10px;
        font-family: Arial;
        animation: slideIn 0.3s ease forwards;
    }

    .alert.slide-out {
    animation: slideOut 0.3s ease forwards;
    }

    @keyframes slideIn {
        from { transform: translate(-50%, -150%); }
        to { transform: translate(-50%); }
    }

    @keyframes slideOut {
        from { transform: translate(-50%); }
        to { transform: translate(-50%, -150%); }
    }

    .alert.success {
        background-color: rgb(44, 133, 44);
        color: rgb(170, 204, 170);
    }
    .alert.warn {
        background-color: rgb(228, 205, 0);
        color: rgb(255, 250, 208);
    }
    .alert.info {
        background-color: rgb(105, 105, 105);
        color: rgb(192, 192, 192);
    }
    .alert.error {
        background-color: rgb(184, 19, 19);
        color: rgb(255, 181, 181);
    }
</style>