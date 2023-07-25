<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import { onMount, setContext } from 'svelte';
  import PubSub from 'pubsub-js'
  import MidiNotes from './lib/nodes/MIDINotes.svelte';
  import type { MIDIMessageEvent } from './lib/types/MIDIMessageEvent';
  import TopAppBar, {
    Row,
    Section,
    Title,
  } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import { AutoAdjust } from '@smui/top-app-bar'
  import { writable } from 'svelte/store'
  import MidiControl from './lib/nodes/MIDIControl.svelte';

  const midiAccess = writable(null)
  setContext('midiAccess', midiAccess)

  onMount(async() => {
    try {
      const _midiAccess = await navigator.requestMIDIAccess()
      midiAccess.set(_midiAccess)
      let inputs = []
      let outputs = []
      _midiAccess.inputs.forEach((input) => {
        inputs.push(input)
        input.onmidimessage = (event: MIDIMessageEvent) => {
          PubSub.publish(`onmidimessage.${event.currentTarget.id}`, event)
        }
      })
      _midiAccess.outputs.forEach((output) => { outputs.push(output) })
      console.table(inputs)
      console.table(outputs)
    } catch(err) {
      console.error(err)
    }
  })

  //PubSub.subscribe('onmidimessage', (message: string, data: MIDIMessageEvent) => { console.log(data) })
  let topAppBar: TopAppBar;
</script>

<TopAppBar bind:this={topAppBar} variant="standard">
  <Row>
    <Section>
      <IconButton class="material-icons">menu</IconButton>
      <Title>WebAudio Playground</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton class="material-icons" aria-label="Download">
        file_download
      </IconButton>
      <IconButton class="material-icons" aria-label="Print this page">
        print
      </IconButton>
      <IconButton class="material-icons" aria-label="Bookmark this page">
        bookmark
      </IconButton>
    </Section>
  </Row>
</TopAppBar>

<AutoAdjust {topAppBar}>
<main>

    <div>
      <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
        <img src={viteLogo} class="logo" alt="Vite Logo" />
      </a>
      <a href="https://svelte.dev" target="_blank" rel="noreferrer">
        <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
      </a>
    </div>
    <h1>Vite + Svelte</h1>

    <div class="card">
      <Counter />
    </div>

    <div class="card">
      <MidiNotes />
      <MidiControl />
    </div>

    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
    </p>

    <p class="read-the-docs">
      Click on the Vite and Svelte logos to learn more
    </p>

</main>
</AutoAdjust>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }

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
