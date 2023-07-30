import { bytesEqual, hex2midi, midi2hex } from "./util";

const basic_bytes = new Uint8Array([
    0b1010_0100,
    0b1100_0110,
    0b0100_1101,
    0b0011_1111,
    0b1110_0101,
    0b0010_1010,
    0b1100_0100
])

const basic_midi = new Uint8Array([
    0b110_0101,
    0b010_0100,
    0b100_0110,
    0b100_1101,
    0b011_1111,
    0b110_0101,
    0b010_1010,
    0b100_0100
])

describe('util.bytesEqual', () => {
    const a = new Uint8Array([0x00, 0x01])
    const b = new Uint8Array([0x00, 0x01])

    it('compares bytes', async () => {
        expect(bytesEqual(a,b)).toBe(true)
    })
})

describe('util.midi2hex', () => {
    it('converts basic', async () => {
        const hex = midi2hex(basic_midi)
        expect(hex).toEqual(basic_bytes)
    })

    it('converts ending', async() => {
        const hex = midi2hex(basic_midi.slice(0, -1))
        expect(hex).toEqual(new Uint8Array([
            0b1010_0100,
            0b1100_0110,
            0b0100_1101,
            0b0011_1111,
            0b1110_0101,
            0b0010_1010,
            0b1000_0000
        ]))
    })
})

describe('util.midi2hex', () => {
    it('converts basic', async () => {
        const midi = hex2midi(basic_bytes)
        expect(midi).toEqual(basic_midi)
    })
})
