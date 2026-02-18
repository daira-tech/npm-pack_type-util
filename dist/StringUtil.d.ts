export declare class StringUtil {
    static generateUUIDv7(): string;
    static generateRandom(length: number, option: {
        isSetNumber?: boolean;
        isSetLowerAlphabet?: boolean;
        isSetUpperAlphabet?: boolean;
        isSetSymbol?: boolean;
        isExcludeSimilerChar?: boolean;
        excludeStrings?: string[];
        maxAttenpts?: number;
    }): string;
    static isUUID(value: any): value is string;
    static isHttps(value: any, extensions?: string[] | string): value is string;
    static isExistExtension(value: any, extensions: string[]): value is string;
    /**
     * 値がメールアドレス形式であるかどうかを検証します
     * Validates if the given value is in the format of an email address
     * @param value - 検証する値, The value to be validated
     * @returns {boolean} - 値がメールアドレス形式であるかどうか, Whether the value is in the format of an email address
     */
    static isMail(value: any): value is string;
    static isBase64(value: any): value is string;
    static isEmpty(value: string | null | undefined): value is string;
}
