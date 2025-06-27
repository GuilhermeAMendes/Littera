export function isStringEmpty(value: string): boolean {
  return !value || value.trim() === "";
}

export function containsSQLInjectionPatterns(value: string): boolean {
  const pattern =
    /('|--|;|\/\*|\*\/|xp_|exec|select|insert|update|delete|drop|union|--)/i;
  return pattern.test(value);
}

export function isStringSafe(value: string): boolean {
  return !isStringEmpty(value) && !containsSQLInjectionPatterns(value);
}

export function assertStringIsSafe(value: string, errorMessage: string): void {
  if (!isStringSafe(value)) {
    throw new Error(errorMessage);
  }
}

export function assertMinLength(
  value: string,
  minLength: number,
  errorMessage: string
): void {
  if (isStringEmpty(value) || value.length < minLength) {
    throw new Error(errorMessage);
  }
}

export function assertMaxLength(
  value: string,
  maxLength: number,
  errorMessage: string
): void {
  if (isStringEmpty(value) || value.length > maxLength) {
    throw new Error(errorMessage);
  }
}
