<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()
    function commitValue(value: number) {
        dispatch('change', value)
    }
    
    export let value: number = 0
    
    let active: boolean = false
    $: rotate = value * 300

    let startY: number, startValue: number

	function clamp(num: number, min: number, max: number) {
		return Math.max(min, Math.min(num, max));
	}

	function pointerMove({ clientY }) {
		const valueDiff = (clientY - startY) / 100.0
        value = clamp(startValue - valueDiff, 0, 1)
	}
	
	function pointerDown({ clientY }) {
        document.body.style.cursor = "ns-resize"
        active = true
		startY = clientY
        startValue = value
		window.addEventListener('pointermove', pointerMove)
		window.addEventListener('pointerup', pointerUp)
	}
	
	function pointerUp() {
        document.body.style.cursor = null
        active = false
		window.removeEventListener('pointermove', pointerMove)
		window.removeEventListener('pointerup', pointerUp)
        commitValue(value)
	}
</script>

<div class="knob" class:active={active} on:pointerdown={e => {e.preventDefault(); pointerDown(e)}}>
    <div style="transform: rotate({rotate}deg)" class="marker-container">
        <div class="marker-container--prerotated">
            <div class="marker" />
        </div>
    </div>
</div>

<style lang="scss">
    .knob {
        border-color: white;
        border-radius: 50%;
        border-width: 0.25em;
        border-style: solid;
        aspect-ratio: 1;
        cursor: grab;
        &.active {
            cursor: ns-resize;
        }
        > .marker-container {
            height: 100%;
            > .marker-container--prerotated {
                height: 100%;
                transform: rotate(-150deg);
                > .marker {
                    background-color: white;
                    height: 40%;
                    margin-left: 50%;
                    margin-left: calc(50% - 0.125em);
                    width: 0.25em;
                }
            }
        }
    }
</style>