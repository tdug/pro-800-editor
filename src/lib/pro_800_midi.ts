import { bytesEqual, midi2hex } from "./util"

const _MSG_PREFIX = new Uint8Array([0xF0, 0x00, 0x20, 0x32, 0x00, 0x01, 0x24, 0x00])


function _send_sysex_data(data: Uint8Array): Uint8Array {
    return new Uint8Array([..._MSG_PREFIX, ...data, 0xF7])
}

export class Pro800Version {
    major: number
    minor: number
    patch: number

    constructor(major: number, minor: number, patch: number){
        this.major = major
        this.minor = minor
        this.patch = patch
    }
}
export class Pro800SystemSettings {
    current_patch_number: number
    midi_channel: number

    constructor({
        current_patch_number,
        midi_channel
    } : Pro800SystemSettings) {
        this.current_patch_number = current_patch_number
        this.midi_channel = midi_channel
    }

    static fromBytes(bytes: Uint8Array): Pro800SystemSettings {
        // TODO: Decode the rest of this
        return new this({
            current_patch_number: bytes[6] | (bytes[7] << 7),
            midi_channel: bytes[26]
        })
    }
}

abstract class IPro800Patch {
    name: string
    oscillator_a_frequency: number
    oscillator_a_level: number
    oscillator_a_pulse_width: number
    oscillator_b_frequency: number
    oscillator_b_level: number
    oscillator_b_pulse_width: number
    oscillator_b_fine_tuning: number
    filter_cutoff: number
    filter_resonance: number
    filter_envelope_amount: number
    filter_release: number
    filter_sustain: number
    filter_decay: number
    filter_attack: number
    amplifier_release: number
    amplifier_sustain: number
    amplifier_decay: number
    amplifier_attack: number
    poly_mod_filter_envelope: number
    poly_mod_oscillator_b: number
    low_frequency_oscillator_frequency: number
    low_frequency_oscillator_amount: number
    glide: number
    amplifier_velocity: number
    filter_velocity: number

    sawtooth_a: number
    triangle_a: number
    square_a: number
    sawtooth_b: number
    triangle_b: number
    square_b: number
    oscillator_sync: number
    poly_mod_frequency_a: number
    poly_mod_filter: number


    //low_frequency_oscillator_shape: boolean
    //low_frequency_oscillator_target__vco: number
}
export class Pro800Patch extends IPro800Patch {
    constructor({
        name,
        oscillator_a_frequency,
        oscillator_a_level,
        oscillator_a_pulse_width,
        oscillator_b_frequency,
        oscillator_b_level,
        oscillator_b_pulse_width,
        oscillator_b_fine_tuning,
        filter_cutoff,
        filter_resonance,
        filter_envelope_amount,
        filter_release,
        filter_sustain,
        filter_decay,
        filter_attack,
        amplifier_release,
        amplifier_sustain,
        amplifier_decay,
        amplifier_attack,
        poly_mod_filter_envelope,
        poly_mod_oscillator_b,
        low_frequency_oscillator_frequency,
        low_frequency_oscillator_amount,
        glide,
        amplifier_velocity,
        filter_velocity,

        sawtooth_a,
        triangle_a,
        square_a,
        sawtooth_b,
        triangle_b,
        square_b,
        oscillator_sync,
        poly_mod_frequency_a,
        poly_mod_filter,
    }: IPro800Patch) {
        super()
        this.name = name
        this.oscillator_a_frequency = oscillator_a_frequency
        this.oscillator_a_level = oscillator_a_level
        this.oscillator_a_pulse_width = oscillator_a_pulse_width
        this.oscillator_b_frequency = oscillator_b_frequency
        this.oscillator_b_level = oscillator_b_level
        this.oscillator_b_pulse_width = oscillator_b_pulse_width
        this.oscillator_b_fine_tuning = oscillator_b_fine_tuning
        this.filter_cutoff = filter_cutoff
        this.filter_resonance = filter_resonance
        this.filter_envelope_amount = filter_envelope_amount
        this.filter_release = filter_release
        this.filter_sustain = filter_sustain
        this.filter_decay = filter_decay
        this.filter_attack = filter_attack
        this.amplifier_release = amplifier_release
        this.amplifier_sustain = amplifier_sustain
        this.amplifier_decay = amplifier_decay
        this.amplifier_attack = amplifier_attack
        this.poly_mod_filter_envelope = poly_mod_filter_envelope
        this.poly_mod_oscillator_b = poly_mod_oscillator_b
        this.low_frequency_oscillator_frequency = low_frequency_oscillator_frequency
        this.low_frequency_oscillator_amount = low_frequency_oscillator_amount
        this.glide = glide
        this.amplifier_velocity = amplifier_velocity
        this.filter_velocity = filter_velocity

        this.sawtooth_a = sawtooth_a
        this.triangle_a = triangle_a
        this.square_a = square_a
        this.sawtooth_b = sawtooth_b
        this.triangle_b = triangle_b
        this.square_b = square_b
        this.oscillator_sync = oscillator_sync
        this.poly_mod_frequency_a = poly_mod_frequency_a
        this.poly_mod_filter = poly_mod_filter
    }

    static fromEncodedBytes(encoded_bytes: Uint8Array): Pro800Patch {
        const decoded_bytes = midi2hex(encoded_bytes)
        //console.log('decoded', decoded_bytes)
        return this.fromDecodedBytes(decoded_bytes)
    }

    static fromDecodedBytes(decoded_bytes: Uint8Array): Pro800Patch {
        // console.log('DECODED PREFIX', decoded_bytes.slice(0,8))
        const dataview16 = new DataView(decoded_bytes.buffer, 5, 50)
        const dataview8 = new DataView(decoded_bytes.buffer, 52, 17)

        const variableBytes = decoded_bytes.slice(150)
        const delimeterByte = variableBytes.indexOf(0)
        const nameBytes = variableBytes.slice(0, delimeterByte)
        const name = String.fromCharCode(...nameBytes)

        return new this({
            name,
            oscillator_a_frequency: dataview16.getUint16(0, true),
            oscillator_a_level: dataview16.getUint16(2, true),
            oscillator_a_pulse_width: dataview16.getUint16(4, true),
    
            oscillator_b_frequency: dataview16.getUint16(6, true),
            oscillator_b_level: dataview16.getUint16(8, true),
            oscillator_b_pulse_width: dataview16.getUint16(10, true),
            oscillator_b_fine_tuning: dataview16.getInt16(12, true),
    
            filter_cutoff: dataview16.getUint16(14, true),
            filter_resonance: dataview16.getUint16(16, true),
            filter_envelope_amount: dataview16.getUint16(18, true),
    
            filter_release: dataview16.getUint16(20, true),
            filter_sustain: dataview16.getUint16(22, true),
            filter_decay: dataview16.getUint16(24, true),
            filter_attack: dataview16.getUint16(26, true),
    
            amplifier_release: dataview16.getUint16(28, true),
            amplifier_sustain: dataview16.getUint16(30, true),
            amplifier_decay: dataview16.getUint16(32, true),
            amplifier_attack: dataview16.getUint16(34, true),

            poly_mod_filter_envelope: dataview16.getUint16(36, true),
            poly_mod_oscillator_b: dataview16.getUint16(38, true),
            
            low_frequency_oscillator_frequency: dataview16.getUint16(40, true),
            low_frequency_oscillator_amount: dataview16.getUint16(42, true),

            glide: dataview16.getUint16(44, true),

            amplifier_velocity: dataview16.getUint16(46, true),
            filter_velocity: dataview16.getUint16(48, true),

            sawtooth_a: dataview8.getUint8(0),
            triangle_a: dataview8.getUint8(1),
            square_a: dataview8.getUint8(2),
            sawtooth_b: dataview8.getUint8(3),
            triangle_b: dataview8.getUint8(4),
            square_b: dataview8.getUint8(5),
            oscillator_sync: dataview8.getUint8(6),
            poly_mod_frequency_a: dataview8.getUint8(7),
            poly_mod_filter: dataview8.getUint8(8)
        })
    }

    toDecodedBytes(): Uint8Array {
        const fixed_bytes = new Uint8Array(150)
        const dataview16 = new DataView(fixed_bytes.buffer, 5, 50)
        const dataview8 = new DataView(fixed_bytes.buffer, 52, 17)

        dataview16.setUint16(0, this.oscillator_a_frequency, true)
        dataview16.setUint16(2, this.oscillator_a_level, true)
        dataview16.setUint16(4, this.oscillator_a_pulse_width, true)
        dataview16.setUint16(6, this.oscillator_b_frequency, true)
        dataview16.setUint16(8, this.oscillator_b_level, true)
        dataview16.setUint16(10, this.oscillator_a_pulse_width, true)
        dataview16.setInt16(12, this.oscillator_b_fine_tuning, true)
        dataview16.setUint16(14, this.filter_cutoff, true)
        dataview16.setUint16(16, this.filter_resonance, true)
        dataview16.setUint16(18, this.filter_envelope_amount, true)
        dataview16.setUint16(20, this.filter_release, true)
        dataview16.setUint16(22, this.filter_sustain, true)
        dataview16.setUint16(24, this.filter_decay, true)
        dataview16.setUint16(26, this.filter_attack, true)
        dataview16.setUint16(28, this.amplifier_release, true)
        dataview16.setUint16(30, this.amplifier_sustain, true)
        dataview16.setUint16(32, this.amplifier_decay, true)
        dataview16.setUint16(34, this.amplifier_attack, true)
        dataview16.setUint16(36, this.poly_mod_filter_envelope, true)
        dataview16.setUint16(38, this.poly_mod_oscillator_b, true)
        dataview16.setUint16(40, this.low_frequency_oscillator_frequency, true)
        dataview16.setUint16(42, this.low_frequency_oscillator_amount, true)
        dataview16.setUint16(44, this.glide, true)
        dataview16.setUint16(46, this.amplifier_velocity, true)
        dataview16.setUint16(48, this.filter_velocity, true)

        dataview8.setUint8(0, Number(this.sawtooth_a) << 6)
        dataview8.setUint8(1, Number(this.triangle_a) << 6)
        dataview8.setUint8(2, Number(this.square_a) << 6)
        dataview8.setUint8(3, Number(this.sawtooth_b) << 6)
        dataview8.setUint8(4, Number(this.triangle_b) << 6)
        dataview8.setUint8(5, Number(this.square_b) << 6)
        dataview8.setUint8(6, Number(this.oscillator_sync) << 6)
        dataview8.setUint8(7, Number(this.poly_mod_frequency_a) << 6)
        dataview8.setUint8(8, Number(this.poly_mod_filter) << 6)


        const name_bytes = new TextEncoder().encode(this.name)
        const variable_bytes = new Uint8Array([...name_bytes])

        return new Uint8Array([
            ...fixed_bytes,
            ...variable_bytes
        ])
    }

}

interface Pro800SysExCallbacks {
    onFirmwareVersion?: (firmwareVersion: Pro800Version, event: MIDIMessageEvent) => any
    onSystemSettings?: (systemSettings: Pro800SystemSettings, event: MIDIMessageEvent) => any
    onPatch?: (patch: Pro800Patch, patchNumber: number, event: MIDIMessageEvent) => any
}

export function receive_sysex_data(callbacks: Pro800SysExCallbacks, event: MIDIMessageEvent): void {
    if(!bytesEqual(_MSG_PREFIX, event.data.slice(0,8))) {
        throw new Error("Not a PRO 800 message.")
    }
    switch(event.data[8]) {
        case 0x78:
            const [lsb, msb] = event.data.slice(9,11)
            const requestNumber = msb<<7 | lsb

            if (requestNumber == 510) { // System Settings Code, Hex (little-endian): [0x7E, 0x03]
                if(!callbacks.onSystemSettings) { break }
                const systemSettings = Pro800SystemSettings.fromBytes(event.data.slice(11, -1))
                callbacks.onSystemSettings(systemSettings, event)
            } else if(requestNumber < 400) { // Presets are under 400
                if(!callbacks.onPatch) { break }
                const patch = Pro800Patch.fromEncodedBytes(event.data.slice(11, -1))
                callbacks.onPatch(patch, requestNumber, event)
            }
            break
        case 0x09:
            switch(event.data[9]) {
                case 0x0:
                    if(!callbacks.onFirmwareVersion) { break }
                    const [major, minor, patch] = event.data.slice(10,13)
                    const firmwareVersion = new Pro800Version(major, minor, patch)
                    callbacks.onFirmwareVersion(firmwareVersion, event)
                    break
            }
            break
    }
}

export function request_system_settings(): Uint8Array {
    const data = new Uint8Array([0x77, 0x7E, 0x03])
    return _send_sysex_data(data)
}

export function request_version(): Uint8Array {
    const data = new Uint8Array([0x08, 0x00])
    return _send_sysex_data(data)
}

export function request_patch(n: number): Uint8Array {
    const data = new Uint8Array([0x77, n & 127, n >> 7])
    return _send_sysex_data(data)
}

export function program(n: number, channel: number = 0): Uint8Array {
    const data = new Uint8Array([0xC0 | channel, n])
    return data
}
