import createStack from ".";

describe("Test of createStack()", () => {
  describe("Stack.push", () => {
    test("Pushing should create a new stack", () => {
      const stack = createStack<number>();
      stack.push(0);
      expect(stack.asArray()).toEqual([]);
    });

    test("Pushing should create a new stack", () => {
      const stack = createStack<number>();
      const actual = stack.push(0);
      expect(actual.asArray()).toEqual([0]);
    });
  });

  describe("Stack.pop", () => {
    test("Poping should create a new stack (immutability)", () => {
      const stack = createStack<number>([0]);
      stack.pop();
      expect(stack.asArray()).toEqual([0]);
    });

    test("Poping should create a new stack (new stack)", () => {
      const stack = createStack<number>([0]);
      const [nextStack, _] = stack.pop();
      expect(nextStack.asArray()).toEqual([]);
    });

    test("Poping should create a new stack (new stack, more values)", () => {
      const stack = createStack<number>([0, 1]);
      const [nextStack, _] = stack.pop();
      expect(nextStack.asArray()).toEqual([0]);
    });

    test("Poping should create a new stack (value)", () => {
      const stack = createStack<number>([0]);
      const [_, value] = stack.pop();
      expect(value).toEqual([0]);
    });
  });

  describe("Stack.pop many", () => {
    test("Poping should create a new stack", () => {
      const stack = createStack<number>([0, 1, 2]);
      stack.pop(2);
      expect(stack.asArray()).toEqual([0, 1, 2]);
    });

    test("Poping should create a new stack", () => {
      const stack = createStack<number>([0, 1, 2]);
      const [nextStack, _] = stack.pop(2);
      expect(nextStack.asArray()).toEqual([0]);
    });

    test("Poping should create a new stack", () => {
      const stack = createStack<number>([0, 1, 2]);
      const [_, values] = stack.pop(2);
      expect(values).toEqual([1, 2]);
    });
  });

  describe("Stack.peek", () => {
    test("It should read the last value", () => {
      const stack = createStack<number>([0, 1]);
      expect(stack.peek()).toEqual(1);
    });

    test("It should not mutate the stack", () => {
      const stack = createStack<number>([0, 1]);
      stack.peek();
      expect(stack.asArray()).toEqual([0, 1]);
    });
  });
});

// TODO: what happens (should happen) when trying to pop on a an empty stack
