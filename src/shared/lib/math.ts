import { RandomGenerator } from ".";

export class MathService {
    static random = new RandomGenerator();

    static pow(base: bigint, exponent: bigint): bigint {
        if (exponent < 0n) {
            throw new Error("Exponent must be non-negative for bigintPow function");
        }
    
        let result = 1n;
        let currentBase = base;
        let currentExponent = exponent;
    
        while (currentExponent > 0n) {
            if (currentExponent % 2n === 1n) {
                result *= currentBase;
            }
    
            currentBase *= currentBase;
            currentExponent = currentExponent >> 1n;
        }
    
        return result;
    }

    static modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
      if (modulus === 1n) return 0n;
      let result = 1n;
      base = base % modulus;
      while (exponent > 0n) {
        if (exponent % 2n === 1n) {
          result = (result * base) % modulus;
        }
        exponent = exponent >> 1n;
        base = (base * base) % modulus;
      }
      return result;
    }

    static isPrime(n: bigint, kFermat: number = 5, kMillerRabin: number = 5) {
      const primeFermat = this.isPrimeFermat(n, kFermat);
      const primeMillerRabin = this.isPrimeMillerRabin(n, kMillerRabin);
  
      return primeFermat && primeMillerRabin
    }

    static isPrimeFermat(n: bigint, k: number = 5) {
      console.log('random', this.random)

      if (n <= 1n) {
        return false;
      }
  
      if (n <= 3n) {
        return true;
      }
  
      for (let i = 0; i < k; i++) {
        const a = this.random.nextInRange(2n, n - 2n);
        if (this.modPow(a, n - 1n, n) !== 1n) {
          return false;
        }
      }
  
      return true;
    }

    static isPrimeMillerRabin(n: bigint, k: number = 5) {
      if (n <= 1n) {
        return false
      }
  
      if (n === 2n || n === 3n) {
        return true
      }
  
      // Represent n - 1 as 2^r * d
      let r = 0;
      let d = n - 1n;
      while (d % 2n === 0n) {
        r++;
        d /= 2n;
      }
  
      // Perform the Miller-Rabin test k times
      for (let i = 0; i < k; i++) {
        const a = this.random.nextInRange(2n, n - 2n);
        let x = this.modPow(a, d, n);
  
        if (x === 1n || x === n - 1n) {
          continue;
        }
  
        for (let j = 0; j < r - 1; j++) {
          x = this.modPow(x, 2n, n);
          if (x === n - 1n) {
            break;
          }
        }
  
        if (x !== n - 1n) {
          return false
        }
      }
  
      return true
    }
    
    static generateRandomPrime(bits: number): bigint {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const randomNum = this.random.nextInRange(
              2n ** BigInt(bits - 1),
              2n ** BigInt(bits) - 1n
            );
            const isPrime = this.isPrime(randomNum);
            if (isPrime) {
              return randomNum;
            }
        }
    }

    findGenerator(p: bigint, q: bigint): bigint | null {
      for (let g = 2n; g < p; g++) {
        if (MathService.modPow(g, q, p) === 1n) {
          return g;
        }
      }
      return null;
    }
}
  