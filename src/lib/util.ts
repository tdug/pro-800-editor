export function midi2hex(bytes: Uint8Array): Uint8Array {
    if(bytes.length <= 8) {
        const decoded = Uint8Array.from(
            {length: bytes.length - 1},
            (_x, i) => (((bytes[0] >> i & 1) << 7) | bytes[i+1])
        )
        return decoded
    }
    const out = [];
    for(let chunkOffset = 0; bytes[chunkOffset] !== undefined; chunkOffset += 8) {
        out.push(...midi2hex(bytes.slice(chunkOffset, chunkOffset + 8)))
    }
    return new Uint8Array([...out])
}

export function hex2midi(bytes: Uint8Array): Uint8Array {
    if(bytes.length <= 7) {
        return new Uint8Array([
            bytes.reduce((acc,x,i) => acc | (x >> 7 & 1) << i, 0),
            ...bytes.map(byte => byte & 0b111_1111)
        ])
    }
    const out = [];
    for(let chunkOffset=0; bytes[chunkOffset] !== undefined; chunkOffset += 7) {
        out.push(...hex2midi(bytes.slice(chunkOffset, chunkOffset+7)))
    }
    return new Uint8Array([...out])
}

export function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
    if(a.length !== b.length) { return false }
    for(let i=a.length; i > -1; i--) { if(a[i] !== b[i]) { return false } }
    return true
}