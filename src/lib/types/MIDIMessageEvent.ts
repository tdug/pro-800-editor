interface MIDIMessageEventTarget extends EventTarget {
    id: string
}

export interface MIDIMessageEvent extends WebMidi.MIDIMessageEvent {
    currentTarget: MIDIMessageEventTarget | WebMidi.MIDIInput
}
