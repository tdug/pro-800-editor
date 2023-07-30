<script>
    import ControlKnob from "./ControlKnob.svelte";
</script>

<div class="panel-container">
    <div id="oscillator-a" class="border">
        <div class="knob"><ControlKnob name="FREQUENCY" value={0} onChange={() => {}}/></div>
        <div class="knob"><ControlKnob name="PULSE WIDTH" value={0.5} onChange={() => {}}/></div>
    </div>
    <div id="oscillator-b" class="border">Oscillator B</div>
    <div id="poly-mod" class="border">Poly Mod</div>
    <div id="noise" class="border">Noise</div>
    <div id="lfo-mod" class="border">LFO Mod</div>
    <div id="glide" class="border">Glide</div>
    <div id="filter" class="border">Filter</div>
    <div id="amplifier" class="border">Amplifier</div>
    <div id="master-tune">Master Tune</div>
    <div id="volume">Volume</div>
</div>

<style lang="scss">
    .panel-container {
        display: grid;
        height: 50rem;
        gap: 1em;
        > * {
            display: grid;
        }
        > .border {
            border-color: white;
            border-style: solid;
            border-radius: 1rem;
        }
        > #oscillator-a {
            grid-column-start: 1;
            grid-column-end: 6;
            grid-row-start: 1;
            grid-template-columns: 2fr 2fr 1fr 1fr 1fr 2fr 2fr;
        }
        > #oscillator-b {
            grid-column-start: 1;
            grid-column-end: 6;
            grid-row-start: 2;
        }
        > #poly-mod {
            grid-column-start: 1;
            grid-column-end: 5;
            grid-row-start: 3;
        }
        > #noise {
            grid-column-start: 5;
            grid-column-end: 6;
            grid-row-start: 3;
        }
        > #lfo-mod {
            grid-column-start: 1;
            grid-column-end: 5;
            grid-row-start: 4;
        }
        > #glide {
            grid-column-start: 5;
            grid-column-end: 5;
            grid-row-start: 4;
            grid-row-end: 4;
        }
        > #filter {
            grid-column-start: 6;
            grid-column-end: 10;
            grid-row-start: 2;
            grid-row-end: 4;
        }
        > #amplifier {
            grid-column-start: 6;
            grid-column-end: 10;
            grid-row-start: 4;
        }
        > #master-tune {
            grid-column-start: 10;
            grid-row-start: 2;
        }
        > #volume {
            grid-column-start: 10;
            grid-row-start: 4;
        }
    }
</style>