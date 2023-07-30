import { writable } from "svelte/store";

export const devices = writable({inputs: {}, outputs: {}})
export const selectedDevice = writable({inputID: null, outputID: null})