type Operand = number;

const UNARY_OPERATORS = ["NEG"] as const;

type UnaryOperator = (typeof UNARY_OPERATORS)[number];

const BINARY_OPERATORS = ["+", "-", "*", "/", "MOD"] as const;

type BinaryOperator = (typeof BINARY_OPERATORS)[number];

type Operator = UnaryOperator | BinaryOperator;

type Token = Operand | Operator;

type UnaryOperation = (operand: Operand) => number;

type BinaryOperation = (first: Operand, second: Operand) => number;

const isUnaryOperator = (token: Token): token is UnaryOperator => {
  return UNARY_OPERATORS.includes(token as UnaryOperator);
};

const isBinaryOperator = (token: Token): token is BinaryOperator => {
  return BINARY_OPERATORS.includes(token as BinaryOperator);
};

const UNARY_OPERATIONS: Record<UnaryOperator, UnaryOperation> = {
  NEG: (operand) => -operand,
};

const BINARY_OPERATIONS: Record<BinaryOperator, BinaryOperation> = {
  "+": (first, second) => first + second,
  "-": (first, second) => first - second,
  "*": (first, second) => first * second,
  "/": (first, second) => {
    validateDividerIsNotNull(second);
    return first / second;
  },
  MOD: (first, second) => {
    validateDividerIsNotNull(second);
    return first % second;
  },
};

const validateDividerIsNotNull = (divider: Operand): void => {
  if (divider === 0) {
    throw Error("Division by 0.");
  }
};

const rpn = (expression: Token[]): number => {
  const token = expression[1];
  if (isUnaryOperator(token)) {
    // @ts-ignore
    return UNARY_OPERATIONS[token](expression[0]);
  }
  const nextToken = expression[2];
  if (isBinaryOperator(nextToken)) {
    // @ts-ignore
    return BINARY_OPERATIONS[nextToken](expression[0], expression[1]);
  }
};

export default rpn;
