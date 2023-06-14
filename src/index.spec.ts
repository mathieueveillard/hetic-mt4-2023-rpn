import rpn from ".";

describe("Unary operators", () => {
  test("Negation", () => {
    expect(rpn([1, "NEG"])).toEqual(-1);
  });

  test("[Triangulation] Negation", () => {
    expect(rpn([2, "NEG"])).toEqual(-2);
  });
});

describe("Binary operators", () => {
  test("Addition", () => {
    expect(rpn([0, 0, "+"])).toEqual(0);
  });

  test("[Triangulation] Addition", () => {
    expect(rpn([1, 0, "+"])).toEqual(1);
  });

  test("[Triangulation] Addition", () => {
    expect(rpn([0, 1, "+"])).toEqual(1);
  });

  test("Substraction", () => {
    expect(rpn([1, 1, "-"])).toEqual(0);
  });

  test("Multiplication", () => {
    expect(rpn([1, 1, "*"])).toEqual(1);
  });

  describe("Division", () => {
    test("Division", () => {
      expect(rpn([1, 2, "/"])).toEqual(0.5);
    });

    test("Error case: division by 0", () => {
      expect(() => rpn([1, 0, "/"])).toThrowError("Division by 0.");
    });
  });

  describe("Modulo", () => {
    test("Modulo", () => {
      expect(rpn([3, 2, "MOD"])).toEqual(1);
    });

    test("Error case: division by 0", () => {
      expect(() => rpn([1, 0, "MOD"])).toThrowError("Division by 0.");
    });
  });
});

describe("Many operations", () => {
  test("Many operations", () => {
    expect(rpn([1, 1, 1, "+", "+"])).toEqual(3);
  });

  test("[Control]", () => {
    expect(rpn([1, 1, "+", 1, "+"])).toEqual(3);
  });

  test("[Control]", () => {
    expect(rpn([3, 1, "NEG", "+", 4, 4, "*", "-"])).toEqual(-14);
  });

  describe("", () => {
    test("Not enough operands (unary operators)", () => {
      expect(() => rpn(["NEG"])).toThrowError("Not enough operands");
    });

    test("Not enough operands (binary operators)", () => {
      expect(() => rpn([1, "+"])).toThrowError("Not enough operands");
    });

    test("Too many operands", () => {
      expect(() => rpn([1, 1, 1, "+"])).toThrowError("Not a valid expression");
    });
  });
});
