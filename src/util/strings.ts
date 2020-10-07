export function interpolate(string: string, values: any) {
    const names = Object.keys(values)
    const vals = Object.values(values)
    return new Function(...names, `return \`${string}\`;`)(...vals)
}
