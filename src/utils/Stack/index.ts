export type Stack<T> = {
  push: (t: T) => Stack<T>;
  pop: (n?: number) => [Stack<T>, T[]];
  peek: () => T;
  asArray: () => T[];
};

const createStack = <T>(values: T[] = []): Stack<T> => {
  const push = (t: T) => createStack([...values, t]);

  const pop = (n: number = 1): [Stack<T>, T[]] => {
    if (n === 1) {
      const value = values[values.length - 1];
      const nextStack = createStack(values.slice(0, values.length - 1));
      return [nextStack, [value]];
    }

    if (n === 2) {
      const [intermediaryStack, [lastValue]] = pop(1);
      const [nextStack, [antepenultimate]] = intermediaryStack.pop(1);
      return [nextStack, [antepenultimate, lastValue]];
    }

    // Après la pause
  };

  const peek = (): T => values[values.length - 1];

  const asArray = () => values;

  return {
    push,
    pop,
    peek,
    asArray,
  };
};

export default createStack;
