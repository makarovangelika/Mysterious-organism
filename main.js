// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      let randomIndex = Math.floor(Math.random() * 15);
      let currentBase = this.dna[randomIndex];
      let randomBase = returnRandBase();
      while (randomBase === currentBase) {
        randomBase = returnRandBase();
      }
      this.dna[randomIndex] = randomBase;
      return this.dna;
    },
    compareDNA(object) {
      let total = 0;
      let percentage;
      for (let i = 0; i < this.dna.length; i++) {
        for (let j = 0; j < object.dna.length; j++) {
          if (this.dna[i] === object.dna[j] && i === j) {
            total++;
          }
        }
      }
      percentage = total * 100 / this.dna.length;
      percentage = percentage.toFixed(2);
      console.log(`Specimen #${this.specimenNum} and specimen #${object.specimenNum} have ${percentage}% DNA in common`);
      return percentage;
    },
    willLikelySurvive() {
      let total = 0;
      for (item of this.dna) {
        if (item === 'C' || item === 'G') {
          total++;
        }
      }
      let percentage = total * 100 / 15;
      return percentage >= 60;
      },
      complementStrand() {
        return this.dna.map(base => {
          switch (base) {
            case 'A':
              return 'T';
              break;
            case 'T':
              return 'A';
              break;
            case 'C':
              return 'G';
              break;
            case 'G':
              return 'C';
              break;
          }
        });
      }
    }
  }

//Tests
let instance1 = pAequorFactory(1, mockUpStrand());
console.log(instance1);
let instance2 = pAequorFactory(2, mockUpStrand());
console.log(instance2);
instance1.compareDNA(instance2);
console.log(instance1.willLikelySurvive());
console.log(instance2.willLikelySurvive());
console.log(instance1.complementStrand());

const createInstances = () => {
  let instanceArray = [];
  let id = 1;
  while (instanceArray.length < 30) {
    let instance = pAequorFactory(id, mockUpStrand());
    if (instance.willLikelySurvive()) {
      instanceArray.push(instance);
      id++;
    }
  }
  return instanceArray;
}

//Tests
console.log(createInstances());
for (item of createInstances()) {
  console.log(item.willLikelySurvive());
}

//Finding the most related instances
let instanceArray = createInstances();
let maxPercentage = null;
let pair = [null, null]
for (let i = 0; i < instanceArray.length; i++) {
  for (let j = i + 1; j < instanceArray.length; j++) {
    let item1 = instanceArray[i];
    let item2 = instanceArray[j];
    let percentage = item1.compareDNA(item2);
    if (percentage > maxPercentage) {
      maxPercentage = percentage;
      pair = [[item1, item2]];
    } else if (percentage === maxPercentage) {
      maxPercentage = percentage;
      pair.push([item1, item2]);
    }
  }
}
for (let i = 0; i < pair.length; i++) {
  let item1 = pair[i][0];
  let item2 = pair[i][1];
  console.log(`Specimen #${item1.specimenNum} and specimen #${item2.specimenNum} are the most related instances. They have ${maxPercentage}% DNA in common`);
}





