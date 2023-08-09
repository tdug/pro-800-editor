<script lang="ts">
  import { onMount } from 'svelte';
  import PubSub from 'pubsub-js'
  import type { MIDIMessageEvent } from './lib/types/MIDIMessageEvent';
  import TopAppBar, {
    Row,
    Section,
    Title,
  } from '@smui/top-app-bar';
  import { AutoAdjust } from '@smui/top-app-bar'
  import MidiLog from './lib/MIDILog.svelte';
  import Pro800 from './lib/Pro800/index.svelte';
  import {devices, selectedDevice} from './lib/stores'
  import Select, {Option} from '@smui/select';
  import { receive_sysex_data, request_version, Pro800Version } from './lib/pro_800_midi';

  function setupMidiAccess(midiAccess: WebMidi.MIDIAccess) {
    midiAccess.inputs.forEach((input) => {
      input.onmidimessage = (event: MIDIMessageEvent) => {
        PubSub.publish(`onmidimessage.${event.currentTarget.id}`, event)
      }
    })
    midiAccess.inputs.forEach((device) => { $devices.inputs[device.id] = device })
    midiAccess.outputs.forEach((device) => { $devices.outputs[device.id] = device })
  }

  let selectedOutputID: string;
  function sendIdentify() {
    console.log("Sending Identify")
    if(!selectedOutputID) { $selectedDevice = {inputID: null, outputID: null}; return }
      $devices.outputs[selectedOutputID].send(request_version())
  }
  function onFirmwareVersion(version: Pro800Version, event: MIDIMessageEvent) {
    $selectedDevice = {inputID: event.currentTarget.id, outputID: selectedOutputID}
    console.log(`PRO 800 Connected. Firmware Version: ${version.major}.${version.minor}.${version.patch}`)
  }

  onMount(async() => {
    try {
      const midiAccess = await navigator.requestMIDIAccess({sysex: true}).then()
      midiAccess.onstatechange = (event: WebMidi.MIDIConnectionEvent) => {
        setupMidiAccess(midiAccess)
      }
      setupMidiAccess(midiAccess)
    } catch(err) {
      console.error(err)
    }
  })
  onMount(() => {
    const token = PubSub.subscribe('onmidimessage', (message: string, event: MIDIMessageEvent) => {
      if(event.data[0]>>4 != 0xF) { return }
      try {receive_sysex_data({onFirmwareVersion}, event)} finally {}
    })
    return () => { PubSub.unsubscribe(token) }
  })

  let topAppBar: TopAppBar
</script>
<MidiLog />

<main>
<TopAppBar bind:this={topAppBar} variant="standard">
  <Row>
    <Section>

      <!-- <IconButton class="material-icons">menu</IconButton> -->
      <Title>PRO 800</Title>
    </Section>
    <Section align="end" toolbar>
      <Select variant="outlined" bind:value={selectedOutputID} on:SMUISelect:change={sendIdentify}>
        <Option value={null}>Select MIDI [out]</Option>
        {#each Object.keys($devices.outputs) as outputID}
          <Option value={outputID}>{$devices.outputs[outputID].name}</Option>
        {/each}
      </Select>
    </Section>
  </Row>
</TopAppBar>

<AutoAdjust {topAppBar}>
  <Pro800 />
</AutoAdjust>
</main>

<style>
  /* Hide everything above this component. */
  :global(#app),
  :global(body),
  :global(html) {
    display: block !important;
    height: auto !important;
    width: auto !important;
    position: static !important;
  }
</style>
