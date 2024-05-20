import * as CryptoJS from 'crypto-js/index'
import { MathService } from "./math";

export class StandardService {
  // Выбор a (0 < a < р – 1), для которого a^q mod p = 1
  static chooseA(p: bigint, q: bigint) {
    for (let a = 2n; a < p - 1n; a++) {
      if (MathService.modPow(a, q, p) === 1n) {
        return a;
      }
    }
    return -1n
  }

  // Выбор закрытого ключа x (0 < x < q)
  static choosePrivateKey(q: bigint) {
    return BigInt(MathService.random.nextInRange(0n, q));
  }

  // Вычисление y = a^x mod p
  static calculatePublicKey(a: bigint, x: bigint, p: bigint) {
    return MathService.modPow(a, x, p);
  }

  static generatePQA(qBits: number) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const q = MathService.generateRandomPrime(qBits);
      let p = q + 1n;

      let isPrime = MathService.isPrime(p);
      while (!isPrime) {
        p += q;
        isPrime = MathService.isPrime(p);
      }

      const a = this.chooseA(p, q);
      if (a !== null) {
        return {
          p,
          q,
          a,
        };
      }
    }
  }

  static generateKeyPair(p: bigint, q: bigint, a: bigint) {
    // Выбор закрытого ключа x (0 < x < q)
    const x = StandardService.choosePrivateKey(q);

    // Вычисление y = a^x mod p
    const y = StandardService.calculatePublicKey(a, x, p);

    // Возвращаем закрытый и открытый ключи
    return { x, y };
  }

  static calculateH(message: string): bigint {
    const hash = CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
    return BigInt('0x' + hash);
  }

  static calculateK(q: bigint): bigint {
    let k: bigint;
    do {
      k = MathService.generateRandomPrime(MathService.bitLength(q));
    } while (k <= 0n || k >= q);
    return k;
  }

  static calculateW(a: bigint, k: bigint, p: bigint): bigint {
    return MathService.modPow(a, k, p);
  }

  static calculateWComma(w: bigint, q: bigint): bigint {
    return w % q;
  }

  static calculateS(x: bigint, wComma: bigint, k: bigint, h: bigint, q: bigint): bigint {
    return (x * wComma + k * h) % q;
  }

  static calculateV(h: bigint, q: bigint): bigint {
    const qMinusTwo = q - 2n;
    return MathService.modPow(h, qMinusTwo, q);
  }

  static calculateZ1(s: bigint, v: bigint, q: bigint): bigint {
    return (s * v) % q;
  }

  static calculateZ2(wComma: bigint, v: bigint, q: bigint): bigint {
    const qMinusWComma = q - wComma;
    return (qMinusWComma * v) % q;
  }

  static calculateU(a: bigint, z1: bigint, y: bigint, z2: bigint, p: bigint, q: bigint): bigint {
    const aToZ1 = MathService.modPow(a, z1, p);
    const yToZ2 = MathService.modPow(y, z2, p);
    const u = (aToZ1 * yToZ2) % p;
    return u % q;
  }
}
