export function HandleRequestError(message: string, error: any): never {
  if (error.name === "AbortError") {
    throw new Error(message);
  }

  if (error instanceof TypeError) {
    throw new Error(message);
  }

  if (error instanceof Error) {
    throw error; // <- preserve the original message
  }

  throw new Error(message);
}
