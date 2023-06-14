// SOL_I_D
// Interface Segregation Principle
// a.k.a. Principe de Demeter

type Name = {
  first: string;
  last: string;
};

type Person = {
  name: Name;
  dateOfBirth: Date;
};

type HasDateOfBirth = {
  dateOfBirth: Date;
};

// const computeAge = ({ dateOfBirth }: Person): number => {
const computeAge = ({ dateOfBirth }: HasDateOfBirth): number => {
  const now = Date.now();
  // ...
};

// SO_L_ID
// Liskov Substitution Principle

class Rectangle {
  constructor(private width: number, private height: number) {}

  setWidth = (width: number) => {
    this.width = width;
  };

  setHeight = (height: number) => {
    this.height = height;
  };

  computeArea = (): number => this.width * this.height;
}

// Object
// Encapsulation: 1st of the 4 pilars of Object-oriented programmation
namespace OOP {
  class Counter {
    // Data
    private value = 0;

    // Behavior that works on data
    increment = (): void => {
      this.value += 1;
    };

    // DON'T DO THIS (asking data)!
    // https://martinfowler.com/bliki/TellDontAsk.html
    getValue = () => this.value;

    // DON'T DO THIS (asking data)!
    // https://martinfowler.com/bliki/TellDontAsk.html
    setValue = (value: number) => {
      this.value = value;
    };
  }

  // DON'T DO THIS!
  // https://martinfowler.com/bliki/TellDontAsk.html
  const counter = new Counter();
  const incrementBy2 = (counter: Counter): void => {
    const value = counter.getValue();
    counter.setValue(value + 2);
  };
}

namespace FP {
  // Data
  type Counter = Readonly<{
    value: number;
  }>;

  // Behavior
  const increment = (counter: Counter): Counter => {
    return {
      ...counter,
      value: counter.value + 1,
    };
  };
}
