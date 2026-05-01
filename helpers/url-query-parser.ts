export function QueryStrongParser(value:unknown, fallback:number) : number {
    const num = Number(value)
     if (Number.isNaN(num)) return fallback
     if (num < 1) return fallback

     return Math.floor(num)
}