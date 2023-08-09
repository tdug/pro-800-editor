<script lang="ts">
    import ControlKnob from "./ControlKnob.svelte"
    import {panel} from "../stores"
</script>

<div class="panel-container">
    <div class="oscillator-a border"><h6 class="border-label">Oscillator A</h6></div>
    <div id="oscillator-b" class="border"><h6 class="border-label">Oscillator B</h6></div>
    <div id="poly-mod" class="border"><h6 class="border-label">Poly-Mod</h6></div>
    <div id="noise" class="border"><h6 class="border-label">Noise</h6></div>
    <div id="lfo-mod" class="border"><h6 class="border-label">LFO-Mod</h6></div>
    <div id="glide" class="border"><h6 class="border-label">Glide</h6></div>
    <div id="filter" class="border"><h6 class="border-label">Filter</h6></div>
    <div id="amplifier" class="border"><h6 class="border-label">Amplifier</h6></div>
    <div id="master-tune" class="borderless"><h6 class="border-label">Master Tune</h6></div>
    <div id="volume" class="borderless"><h6 class="border-label">Volume</h6></div>

    <div id="knob-oscillator-a-frequency" class="control"><ControlKnob value={$panel.oscillator_a_frequency} on:change={({detail}) => {$panel.oscillator_a_frequency = detail}} /></div>
    <div id="knob-oscillator-a-pulse-width" class="control"><ControlKnob value={$panel.oscillator_a_pulse_width} on:change={({detail}) => {$panel.oscillator_a_pulse_width = detail}}/></div>
    <div id="knob-oscillator-a-level" class="control"><ControlKnob value={$panel.oscillator_a_level} on:change={({detail}) => {$panel.oscillator_a_level = detail}}/></div>
    <div id="knob-oscillator-b-frequency" class="control"><ControlKnob value={$panel.oscillator_b_frequency} on:change={({detail}) => {$panel.oscillator_b_frequency = detail}} /></div>
    <div id="knob-oscillator-b-fine-tuning" class="control"><ControlKnob value={$panel.oscillator_b_fine_tuning} on:change={({detail}) => {$panel.oscillator_b_fine_tuning = detail}} /></div>
    <div id="knob-oscillator-b-pulse-width" class="control"><ControlKnob value={$panel.oscillator_b_pulse_width} on:change={({detail}) => {$panel.oscillator_b_pulse_width = detail}}/></div>
    <div id="knob-oscillator-b-level" class="control"><ControlKnob value={$panel.oscillator_b_level} on:change={({detail}) => {$panel.oscillator_b_level = detail}} /></div>
    <div id="knob-poly-mod-filter-envelope" class="control"><ControlKnob value={$panel.poly_mod_filter_envelope} on:change={({detail}) => {$panel.poly_mod_filter_envelope = detail}} /></div>
    <div id="knob-low-frequency-oscillator-amount" class="control"><ControlKnob value={$panel.low_frequency_oscillator_amount} on:change={({detail}) => {$panel.low_frequency_oscillator_amount = detail}} /></div>
    <div id="knob-noise" class="control"><ControlKnob value={$panel.noise} on:change={({detail}) => {$panel.noise = detail}} /></div>
    <div id="knob-glide" class="control"><ControlKnob value={$panel.glide} on:change={({detail}) => {$panel.glide = detail}} /></div>
    <div id="knob-filter-cutoff" class="control"><ControlKnob value={$panel.filter_cutoff} on:change={({detail}) => {$panel.filter_cutoff = detail}} /></div>
    <div id="knob-filter-resonance" class="control"><ControlKnob value={$panel.filter_resonance} on:change={({detail}) => {$panel.filter_resonance = detail}} /></div>
    <div id="knob-filter-envelope-amount" class="control"><ControlKnob value={$panel.filter_envelope_amount} on:change={({detail}) => {$panel.filter_envelope_amount = detail}} /></div>
    <div id="knob-filter-attack" class="control"><ControlKnob value={$panel.filter_attack} on:change={({detail}) => {$panel.filter_attack = detail}} /></div>
    <div id="knob-filter-decay" class="control"><ControlKnob value={$panel.filter_decay} on:change={({detail}) => {$panel.filter_decay = detail}} /></div>
    <div id="knob-filter-sustain" class="control"><ControlKnob value={$panel.filter_sustain} on:change={({detail}) => {$panel.filter_sustain = detail}} /></div>
    <div id="knob-filter-release" class="control"><ControlKnob value={$panel.filter_release} on:change={({detail}) => {$panel.filter_release = detail}} /></div>
    <div id="knob-master-tuning" class="control"><ControlKnob value={$panel.master_tuning} on:change={({detail}) => {$panel.master_tuning = detail}} /></div>
    <div id="knob-master-volume" class="control"><ControlKnob value={$panel.master_volume} on:change={({detail}) => {$panel.master_volume = detail}} /></div>

    <div id="knob-amplifier-attack" class="control"><ControlKnob value={$panel.amplifier_attack} on:change={({detail}) => {$panel.amplifier_attack = detail}} /></div>
    <div id="knob-amplifier-decay" class="control"><ControlKnob value={$panel.amplifier_decay} on:change={({detail}) => {$panel.amplifier_decay = detail}} /></div>
    <div id="knob-amplifier-sustain" class="control"><ControlKnob value={$panel.amplifier_sustain} on:change={({detail}) => {$panel.amplifier_sustain = detail}} /></div>
    <div id="knob-amplifier-release" class="control"><ControlKnob value={$panel.amplifier_release} on:change={({detail}) => {$panel.amplifier_release = detail}} /></div>
        
</div>

<style lang="scss">
    .panel-container {
        display: grid;
        gap: 1em;
        > * {
            display: grid;
        }
        > .border {
            border-color: white;
            border-style: solid;
            border-radius: 1rem;
        }
        > .border, > .borderless {
            position: relative;
            display: block;
            grid-template-columns: subgrid;
            grid-template-rows: subgrid;
            h6.border-label {
                background-color: black;
                position: absolute;
                margin: auto;
                top: -1rem;
                left: 50%;
                padding: 0 1rem;
                transform: translateX(-50%);
                text-transform: uppercase;
                white-space: nowrap;
            }
        }
        > .oscillator-a {
            grid-column-start: 1;
            grid-column-end: 6;
            grid-row-start: 1;
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
        
        .control {
            padding: 1vw;
            overflow: hidden;
        }
        
        > #knob- {
            &oscillator-a-frequency {
                grid-column-start: 1;
                grid-row-start: 1;
            }
            &oscillator-a-pulse-width {
                grid-column-start: 4;
                grid-row-start: 1;
            }
            &oscillator-a-level {
                grid-column-start: 5;
                grid-row-start: 1;
            }
            &oscillator-b-frequency {
                grid-column-start: 1;
                grid-row-start: 2;
            }
            &oscillator-b-fine-tuning {
                grid-column-start: 2;
                grid-row-start: 2;
            }
            &oscillator-b-pulse-width {
                grid-column-start: 4;
                grid-row-start: 2;
            }
            &oscillator-b-level {
                grid-column-start: 5;
                grid-row-start: 2;
            }
            &poly-mod-filter-envelope {
                grid-column-start: 1;
                grid-row-start: 3;
            }
            &low-frequency-oscillator-amount {
                grid-column-start: 1;
                grid-row-start: 4;
            }
            &noise {
                grid-column-start: 5;
                grid-row-start: 3;
            }
            &glide {
                grid-column-start: 5;
                grid-row-start: 4;
            }
            &filter-cutoff {
                grid-column-start: 6;
                grid-row-start: 2;
            }
            &filter-resonance {
                grid-column-start: 7;
                grid-row-start: 2;
            }
            &filter-envelope-amount {
                grid-column-start: 8;
                grid-row-start: 2;
            }
            &filter-attack {
                grid-column-start: 6;
                grid-row-start: 3;
            }
            &filter-decay {
                grid-column-start: 7;
                grid-row-start: 3;
            }
            &filter-sustain {
                grid-column-start: 8;
                grid-row-start: 3;
            }
            &filter-release {
                grid-column-start: 9;
                grid-row-start: 3;
            }
            &amplifier-attack {
                grid-column-start: 6;
                grid-row-start: 4;
            }
            &amplifier-decay {
                grid-column-start: 7;
                grid-row-start: 4;
            }
            &amplifier-sustain {
                grid-column-start: 8;
                grid-row-start: 4;
            }
            &amplifier-release {
                grid-column-start: 9;
                grid-row-start: 4;
            }
            &master-tuning {
                grid-column-start: 10;
                grid-row-start: 2;
            }
            &master-volume {
                grid-column-start: 10;
                grid-row-start: 4;
            }
        }
    }
</style>