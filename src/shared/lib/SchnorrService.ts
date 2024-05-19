import { MathService } from "./math";

// export function generateKlausSchnorrAttributes(p: bigint, q: bigint) {
//     const x = new RandomGenerator().nextInRange(1n, q - 1n);

//     const g = findG(p, q);
//     const y = findY(g, x, p);

//     return {
//         x,
//         g,
//         y,
//     };
// }

export class SchnorrService {

  static findGenerator(p: bigint, q: bigint): bigint | null {
    for (let g = 2n; g < p; g++) {
      if (MathService.modPow(g, q, p) === 1n) {
        return g;
      }
    }
    return null;
  }

  static generatePQ(qBits: number) {
    const q = MathService.generateRandomPrime(qBits);
    let p = q + 1n;

    let isPrime = MathService.isPrime(p);
    while (!isPrime) {
      p += q;
      isPrime = MathService.isPrime(p);
    }

    return {
      p,
      q,
    };
  }

  static generateKeysPair(p: bigint, q: bigint) {
    const x = MathService.random.nextInRange(1n, q - 1n);

    const g = MathService.random.nextInRange(2n, p ** 2n);

    const y = MathService.random.nextInRange(2n, p ** 2n);

    return { g, x, y };
  }
  

  static calculateK(q: bigint) {
    const k = MathService.random.nextInRange(1n, q - 1n);
    return k
  }

  static calculateR(k: bigint, g: bigint, p: bigint) {
    const r = MathService.modPow(g, k, p);
    return r;
  }

  static generateE(t: bigint) {
    return MathService.random.nextInRange(0n, 2n ** BigInt(t) - 1n);
  }

  static calculateS(k: bigint, x: bigint, e: bigint, q: bigint) {
    return (k + x * e) % q;
  }

  static calculateR1(g: bigint, s: bigint, y: bigint, e: bigint, p: bigint) {
    return (MathService.pow(g, s) * MathService.pow(y, e)) % p;
  }
}
  