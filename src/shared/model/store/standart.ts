import { create } from "zustand";

export enum AuthStep {
    AFirst = 1,
    BFirst = 2,
    ASecond = 3,
    BSecond = 4
}

interface IStandartStore {
    p?: bigint,
    q?: bigint,
    a?: bigint,
    x?: bigint,
    y?: bigint,

    message?: string;
    setMessage: (message: string | undefined) => void;

    h?: bigint;
    k?: bigint;
    w?: bigint;
    wComma?: bigint;
    s?: bigint;

    v?: bigint;
    z1?: bigint;
    z2?: bigint;
    u?: bigint;

    step?: AuthStep,
    arePrime: boolean,
    setArePrime: (b: boolean) => void,
    setAttr: (key: keyof IStandartStore, value: bigint | number | undefined) => void,
}

export const useStandartStore= create<IStandartStore>((set) => ({
    arePrime: false,
    setArePrime: (b: boolean) => set(() => ({arePrime: b})),
    setAttr: (key, value) => set(() => ({ [key]: value })),
    setMessage: (value) => set(() => ({ message: value })),
}))