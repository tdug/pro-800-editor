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
    data: Uint8Array
    current_patch_number: number

    constructor(data: Uint8Array) {
        this.data = data
        this.current_patch_number = this.data[6] & (this.data[7] << 7)
        // TODO: Decode the rest of this
    }
}
export class Pro800Patch {
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

    sawtooth_a: boolean
    triangle_a: boolean
    square_a: boolean
    sawtooth_b: boolean
    triangle_b: boolean
    square_b: boolean
    oscillator_sync: boolean
    poly_mod_frequency_a: boolean
    poly_mod_filter: boolean
    low_frequency_oscillator_shape: boolean

    low_frequency_oscillator_target: number


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
        poly_mod_filter
    }) {
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
        console.log('decoded', decoded_bytes)
        return this.fromDecodedBytes(decoded_bytes)
    }
    static fromDecodedBytes(decoded_bytes: Uint8Array): Pro800Patch {
        console.log('DECODED PREFIX', decoded_bytes.slice(0,8))
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
            oscillator_a_pulse_width: dataview16.getInt16(4, true),
    
            oscillator_b_frequency: dataview16.getUint16(6, true),
            oscillator_b_level: dataview16.getUint16(8, true),
            oscillator_b_pulse_width: dataview16.getUint16(10, true),
            oscillator_b_fine_tuning: dataview16.getUint16(12, true),
    
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

            sawtooth_a: dataview8.getUint8(0) > 0x00,
            triangle_a: dataview8.getUint8(1) > 0x00,
            square_a: dataview8.getUint8(2) > 0x00,
            sawtooth_b: dataview8.getUint8(3) > 0x00,
            triangle_b: dataview8.getUint8(4) > 0x00,
            square_b: dataview8.getUint8(5) > 0x00,
            oscillator_sync: dataview8.getUint8(6) > 0x00,
            poly_mod_frequency_a: dataview8.getUint8(7) > 0x00,
            poly_mod_filter: dataview8.getUint8(8) > 0x00
        })
    }

    controls() {
        return {
            8: this.oscillator_a_frequency >> 7,
            9: this.oscillator_a_level >> 7,
            10: this.oscillator_a_pulse_width >> 7,
            11: this.oscillator_b_frequency & 0b111_1111,
        }
    }
}

interface Pro800SysExCallbacks {
    onFirmwareVersion?: (firmwareVersion: Pro800Version, event: MIDIMessageEvent) => any
    onSystemSettings?: (systemSettings: Pro800SystemSettings, event: MIDIMessageEvent) => any
    onPatch?: (patch: Pro800Patch, patchNumber, event: MIDIMessageEvent) => any
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
                const systemSettings = new Pro800SystemSettings(event.data.slice(11, -1))
                callbacks.onSystemSettings(systemSettings, event)
                break
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

