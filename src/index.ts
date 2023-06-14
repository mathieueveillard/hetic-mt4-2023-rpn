type Operand = number;

const UNARY_OPERATORS = ["NEG"] as const;

type UnaryOperator = (typeof UNARY_OPERATORS)[number];

const BINARY_OPERATORS = ["+", "-", "*", "/", "MOD"] as const;

type BinaryOperator = (typeof BINARY_OPERATORS)[number];

type Operator = UnaryOperator | BinaryOperator;

type Token = Operand | Operator;

type UnaryOperation = (operand: Operand) => number;

type BinaryOperation = (first: Operand, second: Operand) => number;

type Stack = Operand[];

export const isUnaryOperator = (token: Token): token is UnaryOperator => {
  return UNARY_OPERATORS.includes(token as UnaryOperator);
};

export const isBinaryOperator = (token: Token): token is BinaryOperator => {
  return BINARY_OPERATORS.includes(token as BinaryOperator);
};

const isOperand = (token: Token): token is Operand => {
  return !isUnaryOperator(token) && !isBinaryOperator(token);
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

const recursiveRpn = (stack: Stack, expression: Token[]): number => {
  if (expression.length === 0) {
    return stack[0];
  }

  const [token, ...remainingExpression] = expression;

  if (isOperand(token)) {
    const nextStack = [...stack, token];
    return recursiveRpn(nextStack, remainingExpression);
  }

  if (isUnaryOperator(token)) {
    const operand = stack.pop();
    const result = UNARY_OPERATIONS[token](operand);
    const nextStack = [...stack, result];
    return recursiveRpn(nextStack, remainingExpression);
  }

  if (isBinaryOperator(token)) {
    const secondOperand = stack.pop();
    const firstOperand = stack.pop();
    const result = BINARY_OPERATIONS[token](firstOperand, secondOperand);
    const nextStack = [...stack, result];
    return recursiveRpn(nextStack, remainingExpression);
  }
};

const rpn = (expression: Token[]): number => recursiveRpn([], expression);

export default rpn;
