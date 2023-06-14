export type Stack<T> = {
  push: (t: T) => Stack<T>;
  pop: (n?: number) => [Stack<T>, T[]];
  peek: () => T;
  asArray: () => T[];
  length: () => number;
};

const createStack = <T>(values: T[] = []): Stack<T> => {
  const push = (t: T) => createStack([...values, t]);

  const pop = (n: number = 1): [Stack<T>, T[]] => {
    if (n === 1) {
      const value = values[values.length - 1];
      const nextStack = createStack(values.slice(0, values.length - 1));
      return [nextStack, [value]];
    }

    const [intermediaryStack, [lastValue]] = pop(1);
    const [nextStack, previousValues] = intermediaryStack.pop(n - 1);
    return [nextStack, [...previousValues, lastValue]];
  };

  const peek = (): T => values[values.length - 1];

  const asArray = () => values;

  const length = () => values.length;

  return {
    push,
    pop,
    peek,
    asArray,
    length,
  };
};

export default createStack;
