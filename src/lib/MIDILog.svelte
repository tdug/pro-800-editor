<script lang="ts">
    import PubSub from 'pubsub-js'
    import { onMount } from 'svelte';
    import type { MIDIMessageEvent } from './types/MIDIMessageEvent';


    function onmidimessage(message: string, event: MIDIMessageEvent) {
        const {data: bytes, currentTarget: {id: deviceID}} = event
        console.log(bytes)

        const [command, channel] = [bytes[0] >> 4, bytes[0] & 0xF]

        let verbose: string;
        switch(command) {
            case 0x8:
                verbose = `NoteOff: ${bytes[1]}, Velocity: ${bytes[2]}, Channel: ${channel}`
                break
            case 0x9:
                verbose = `NoteOn: ${bytes[1]}, Velocity: ${bytes[2]}, Channel: ${channel}`
                break
            case 0xB:
                switch(bytes[1]) {
                    case 123:
                        verbose = `AllNotesOff, Channel: ${channel}`
                        break
                    default:
                        verbose = `Control: ${bytes[1]}, Value: ${bytes[2]}, Channel: ${channel}`
                        break
                }
                break
            case 0xC:
                verbose = `Program: ${bytes[1]}`
                break;
            case 0xE:
                const bendVal = bytes[1] | (bytes[2] << 7)
                verbose = `Pitch Bend: ${bendVal}, Channel: ${channel}`
                break
            case 0xF:
                verbose = `System Exclusive`
                break
            default:
                verbose = `Unknown MIDI Message`
        }

        console.log(verbose, event)
    }

    onMount(() => {
        const subscribeToken = PubSub.subscribe('onmidimessage', onmidimessage)
        return () => { PubSub.unsubscribe(subscribeToken) }
    })
</script>
