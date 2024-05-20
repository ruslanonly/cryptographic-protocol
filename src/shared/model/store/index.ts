import { create } from "zustand";

export enum AuthStep {
    AFirst = 1,
    BFirst = 2,
}

interface IAuthenticationStore {
    p?: bigint,
    q?: bigint,
    x?: bigint,
    y?: bigint,
    g?: bigint,
    k?: bigint,
    r?: bigint,
    t?: bigint,
    e?: bigint,
    s?: bigint,
    R?: bigint,
    step?: AuthStep,
    arePrime: boolean,
    setArePrime: (b: boolean) => void,
    setAttr: (key: keyof IAuthenticationStore, value: bigint | number | undefined) => void,
}

export const useAuthenticationStore = create<IAuthenticationStore>((set) => ({
    arePrime: false,
    setArePrime: (b: boolean) => set(() => ({arePrime: b})),
    setAttr: (key, value) => set(() => ({ [key]: value })),
}))