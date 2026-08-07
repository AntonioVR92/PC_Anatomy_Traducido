// Small shared helper functions.

// Joins a list of CSS class names into a single space-separated string,
// removing any empty / false / null values in the process.
export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}
