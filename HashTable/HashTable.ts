class HashTable<T> {
  storage: [string, any][][] = [];
  private length: number = 7;
  private count: number = 0;

  private getIndex(key: string, max: number): number {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = hashCode * 31 + key.charCodeAt(i);
    }
    const index = hashCode % max;
    return index;
  }

  private getNextPrime(num: number) {
    let newLength = num;
    while (!this.isPrime(newLength)) {
      newLength++;
    }
    return newLength;
  }

  private resize(newLength: number) {
    let newPrime = this.getNextPrime(newLength);
    if (newPrime < 7) {
      newPrime = 7;
    }
    this.length = newPrime;
    const oldStorage = this.storage;

    this.storage = [];
    this.count = 0;

    oldStorage.forEach((bucket) => {
      if (!bucket) return;
      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        this.put(tuple[0], tuple[1]);
      }
    });
  }

  put(key: string, value: T) {
    const index = this.getIndex(key, this.length);

    let bucket = this.storage[index];
    if (!bucket) {
      bucket = [];
      this.storage[index] = bucket;
    }

    let isUpdate = false;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        tuple[1] = value;
        isUpdate = true;
      }
    }

    if (!isUpdate) {
      bucket.push([key, value]);
      this.count++;

      const loadFactor = this.count / this.length;
      if (loadFactor > 0.75) {
        this.resize(this.length * 2);
      }
    }
  }

  get(key: string): T | undefined {
    const index = this.getIndex(key, this.length);
    let bucket = this.storage[index];
    if (!bucket) return undefined;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) return tuple[1];
    }
    return undefined;
  }

  delete(key: string): T | undefined {
    const index = this.getIndex(key, this.length);
    let bucket = this.storage[index];
    if (!bucket) return undefined;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        bucket.splice(i, 1);
        this.count--;
        const loadFactor = this.count / this.length;
        if (loadFactor < 0.25 && this.length > 7) {
          this.resize(Math.floor(this.length / 2));
        }
        return tuple[1];
      }
    }
    return undefined;
  }

  isPrime(num: number) {
    const temp = Math.floor(Math.sqrt(num));
    for (let i = 2; i < temp; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
}

const hashTable = new HashTable();
hashTable.put("aaa", 100);
hashTable.put("aaa", 200);
hashTable.put("bbb", 300);
hashTable.put("ccc", 400);
hashTable.put("ddd", 400);
hashTable.put("eee", 400);
hashTable.put("fff", 400);
console.log(hashTable.storage);

console.log(hashTable.get("aaa"));
console.log(hashTable.get("bbb"));
console.log(hashTable.get("ccc"));
console.log(hashTable.get("ddd"));
console.log(hashTable.delete("ccc"));
console.log(hashTable.get("ccc"));
