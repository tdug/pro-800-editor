<script lang="ts">
    import PubSub from 'pubsub-js'
    import { onMount } from 'svelte';
    import { type MIDIMessageEvent } from '../types/MIDIMessageEvent';

    function onmidimessage(message: string, data: MIDIMessageEvent) {
        const {data: bytes, currentTarget: {id: deviceID}} = data

        const [command, channel] = [bytes[0] >> 4, bytes[0] & 0xF]

        switch(command) {
            case 0xB:
                console.log(`Control: ${bytes[1]}, Value: ${bytes[2]}, Channel: ${channel}`)
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
