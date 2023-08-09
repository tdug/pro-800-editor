import { derived, writable, type Writable } from "svelte/store";
import type { Pro800Patch } from "./pro_800_midi";
import app from "../main";

export const devices = writable({inputs: {}, outputs: {}})
export const selectedDevice = writable({inputID: null, outputID: null})


const defaultPanel = {
    oscillator_a_frequency: 0,
    oscillator_a_level: 0,
    oscillator_a_pulse_width: 0,
    oscillator_b_frequency: 0,
    oscillator_b_level: 0,
    oscillator_b_pulse_width: 0,
    oscillator_b_fine_tuning: 0.5,

    poly_mod_filter_envelope: 0,

    noise: 0,
    low_frequency_oscillator_amount: 0,
    glide: 0,

    master_tuning: 0.5
    
}

function createPanel() {
    const {subscribe, set, update} = writable({...defaultPanel})

    function setCurrentPanelFromPatch(patch: Pro800Patch) {
        update((current) => {
            return {
                ...current,
                oscillator_a_frequency: patch.oscillator_a_frequency / 0xFFFF,
                oscillator_b_frequency: patch.oscillator_b_frequency / 0xFFFF
            }
        })
    }

    return {
        subscribe,
        set,
        update,
        setCurrentPanelFromPatch
    }
}

export const panel = createPanel()