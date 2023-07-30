<script lang="ts">
    import { onMount } from "svelte";

    export let name: string = null, value: number = 0, onChange: (value: number) => void
    $: rotate = value * 300
</script>

<div>
<div class="knob">
    <div style="transform: rotate({rotate}deg)" class="marker-container">
        <div class="marker-container--prerotated">
            <div class="marker" />
        </div>
    </div>
</div>

<h6 class="control-name">{name}</h6>
</div>

<style lang="scss">
    .knob {
        border-color: white;
        border-radius: 50%;
        border-width: 0.25em;
        border-style: solid;
        aspect-ratio: 1;
        > .marker-container {
            height: 100%;
            transition: 0.125s ease-in-out;
            > .marker-container--prerotated {
                height: 100%;
                transform: rotate(-150deg);
                > .marker {
                    background-color: white;
                    height: 40%;
                    left: -50%;
                    margin-left: 50%;
                    width: 0.25em;
                }
            }
        }
    }
    h6.control-name {
        margin: 1em 0;
    }
</style>