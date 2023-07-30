<script lang="ts">
    import PubSub from 'pubsub-js'
    import { onMount } from 'svelte'
    import type { MIDIMessageEvent } from '../types/MIDIMessageEvent'
    import { receive_sysex_data, request_patch, Pro800Patch, Pro800SystemSettings, request_system_settings } from '../pro_800_midi';
    import ControlPanel from './ControlPanel.svelte';
    import { devices, selectedDevice } from '../stores';
    import Button from '@smui/button'
    import TextField from '@smui/textfield'

    let systemSettings: Pro800SystemSettings
    let patch: Pro800Patch
    let patch_number: number

    function onSystemSettings(_systemSettings: Pro800SystemSettings, event: MIDIMessageEvent) {
        systemSettings = _systemSettings
        console.log(`Settings Loaded`, systemSettings)
        getPatch(systemSettings.current_patch_number)
    }

    function onPatch(_patch: Pro800Patch, _patch_number: number, event: MIDIMessageEvent) {
        patch = _patch
        patch_number = _patch_number
        console.log(`Patch Loaded`, patch_number, patch)
    }

    function onmidimessage(message: string, event: MIDIMessageEvent) {
        const {data: bytes, currentTarget: {id: deviceID}} = event

        const [command, channel] = [bytes[0] >> 4, bytes[0] & 0xF]

        switch(command) {
            case 0xB:
                const [control, value] = bytes.slice(1,3)
                switch(control) {
                    case 123: // All Notes Off
                        break
                }
                break
            case 0xF:
                receive_sysex_data({onSystemSettings, onPatch}, event)
            default:
                return
        }
    }

    function getPatch(_patch_number: number) {
        $devices.outputs[$selectedDevice.outputID].send(request_patch(_patch_number))
    }

    selectedDevice.subscribe(({outputID}) => {
        if(!outputID) {return}
        $devices.outputs[outputID].send(request_system_settings())
    })

    onMount(() => {
        const subscribeToken = PubSub.subscribe('onmidimessage', onmidimessage)
        return () => { PubSub.unsubscribe(subscribeToken) }
    })

    let input_patch_number: number = 0
</script>

<TextField bind:value={input_patch_number} label="Patch Number" type="number" variant="outlined" />
<Button on:click={() => {getPatch(input_patch_number)}}>Get Patch</Button>

{#if $selectedDevice.inputID && $selectedDevice.outputID}
    <ControlPanel />
{/if}