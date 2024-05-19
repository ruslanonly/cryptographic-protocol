export class RandomGenerator {
    static prevSeed: bigint = BigInt(new Date().getTime());
    seed: bigint;
    a: bigint;
    c: bigint;
    m: bigint;

    constructor(seed?: bigint) {
        this.seed = seed || RandomGenerator.prevSeed;
        this.a = 1664525n;
        this.c = 1013904223n;
        this.m = 2n ** 32n;
    }

    next(): bigint {
        this.seed = (this.a * this.seed + this.c) % this.m;
        RandomGenerator.prevSeed = this.seed;
        return this.seed;
    }

    nextInRange(min: bigint, max: bigint): bigint {
        const range = max - min + 1n;
        return (this.next() % range) + min;
    }
}
