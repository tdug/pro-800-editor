<script lang="ts">
    import PubSub from 'pubsub-js'
    import { onMount } from 'svelte';
    import { type MIDIMessageEvent } from '../types/MIDIMessageEvent';

    function onmidimessage(message: string, data: MIDIMessageEvent) {
        const {data: bytes, currentTarget: {id: deviceID}} = data

        const [command, channel] = [bytes[0] >> 4, bytes[0] & 0xF]

        switch(command) {
            case 0x8:
                console.log(`NoteOff: ${bytes[1]}, Velocity: ${bytes[2]}, Channel: ${channel}`)
                break
            case 0x9:
                console.log(`NoteOn: ${bytes[1]}, Velocity: ${bytes[2]}, Channel: ${channel}`)
                break
            case 0xA:
                if (bytes[1] != 123) return
                console.log(`AllNotesOff, Channel: ${channel}`)
                break
            default:
                return
        }
    }

    onMount(() => {
        const subscribeToken = PubSub.subscribe('onmidimessage', onmidimessage)
        return () => { PubSub.unsubscribe(subscribeToken) }
    })
</script>
