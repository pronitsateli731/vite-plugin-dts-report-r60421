

/**
 * 
 * This function cause no TS error when I use vite-plugin-dts < 3.8 but cause when I use vite-plugin-dts => 3.8
 * Problems occur if I use IterableIterator<T, V>.entries()
 * @param headers 
 * @returns 
 */
const sampleForIssue = (headers: Headers) => Object.fromEntries(headers.entries());

export default {
    sampleForIssue,
}
