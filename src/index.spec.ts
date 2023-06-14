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
