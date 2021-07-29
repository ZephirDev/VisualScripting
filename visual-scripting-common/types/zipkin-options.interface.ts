export interface ZipkinOptionsInterface {
    scheme: "http" | "https",
    host: string,
    port: number,
    path?: string,
}