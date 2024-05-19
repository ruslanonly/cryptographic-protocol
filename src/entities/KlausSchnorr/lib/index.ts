import { RandomGenerator } from "@/shared";

export function calculateK(q: bigint) {
    return new RandomGenerator().nextInRange(1n, q - 1n)
}

export function calculateR() {

}