class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      return null;
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key == key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

// ===IS STRING A PALINDROME?===

function palindrome(string) {
  const hashMap = new HashMap;
  // const letters = string.split('');

  for (let i = 0; i < string.length; i++) {
    if (hashMap.get(string[i])) {
      hashMap.set(string[i], hashMap.get(string[i]) + 1)
    } else {
      hashMap.set(string[i], 1)
    }
  }

  let counter = 0;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap.get(string[i]) % 2 === 0) {
      continue
    } else if (counter < 2) {
      counter++;
      if (counter === 2) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

// === ANAGRAM GROUPING ===

function sortWord(string) {
  string.split('').sort().join('');
}

function anaGrp(arr) {
  let ret = [];
  const hashMap = new HashMap;
  for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < arr[i].length; i++) {
      let asciiCount = 0;
      if (asciiCount) {
        asciiCount += charCodeAt(k);
      } else {
        let asciiCount = arr[i].charCodeAt(k);
      }
      for (let m = 0; m < hashMap.length; m++) {
        if (asciiCount === hashMap[m]) {
          hashMap.set(arr[i], m)
        } else {
          hashMap.set(arr[i], m + 1)
        }
      }
    }
  }
}

// === SEPARATE CHAINING ===

function sepChain() {

}


// ===LORD OF THE RINGS HASHMAP===

const lor = new HashMap

function main() {
  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');

  // console.log(lor);
  // console.log(lor.get('Maiar'))
}

// ===INVOCATIONS===

main();
// console.log(palindrome('acecarr'));
console.log(anaGrp(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
//////// expected output -> [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]
// console.log(sepChain(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
//////// expected output -> [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]

