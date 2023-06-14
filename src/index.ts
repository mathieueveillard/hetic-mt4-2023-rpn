import createStack from "./utils/Stack";
import { Stack as GenericStack } from "./utils/Stack";

type Operand = number;

const UNARY_OPERATORS = ["NEG"] as const;

type UnaryOperator = (typeof UNARY_OPERATORS)[number];

const BINARY_OPERATORS = ["+", "-", "*", "/", "MOD"] as const;

type BinaryOperator = (typeof BINARY_OPERATORS)[number];

type Operator = UnaryOperator | BinaryOperator;

type Token = Operand | Operator;

type UnaryOperation = (operand: Operand) => number;

type BinaryOperation = (first: Operand, second: Operand) => number;

type Stack = GenericStack<Operand>;

const isUnaryOperator = (token: Token): token is UnaryOperator => UNARY_OPERATORS.includes(token as UnaryOperator);

const isBinaryOperator = (token: Token): token is BinaryOperator => BINARY_OPERATORS.includes(token as BinaryOperator);

const isOperand = (token: Token): token is Operand => !isUnaryOperator(token) && !isBinaryOperator(token);

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

const handleUnaryOperation = (stack: Stack, operator: UnaryOperator): Stack => {
  if (stack.length() < 1) {
    throw Error("Not enough operands");
  }
  const [nextStack, [operand]] = stack.pop();
  const result = UNARY_OPERATIONS[operator](operand);
  return nextStack.push(result);
};

const handleBinaryOperation = (stack: Stack, operator: BinaryOperator): Stack => {
  if (stack.length() < 2) {
    throw Error("Not enough operands");
  }
  const [nextStack, [firstOperand, secondOperand]] = stack.pop(2);
  const result = BINARY_OPERATIONS[operator](firstOperand, secondOperand);
  return nextStack.push(result);
};

const recursiveRpn = (stack: Stack, expression: Token[]): number => {
  if (expression.length === 0) {
    if (stack.length() > 1) {
      throw "Not a valid expression";
    }
    return stack.peek();
  }

  const [token, ...remainingExpression] = expression;

  if (isOperand(token)) {
    return recursiveRpn(stack.push(token), remainingExpression);
  }

  if (isUnaryOperator(token)) {
    const nextStack = handleUnaryOperation(stack, token);
    return recursiveRpn(nextStack, remainingExpression);
  }

  if (isBinaryOperator(token)) {
    const nextStack = handleBinaryOperation(stack, token);
    return recursiveRpn(nextStack, remainingExpression);
  }
};

const rpn = (expression: Token[]): number => recursiveRpn(createStack(), expression);

export default rpn;
