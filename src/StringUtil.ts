export class StringUtil {
    public static generateUUIDv7(): string {
        const timestamp = BigInt(Date.now()) * BigInt(10000) + BigInt(process.hrtime.bigint() % BigInt(10000));
        const timeHex = timestamp.toString(16).padStart(16, '0');
    
        let randomHex = '';
        for (let i = 0; i < 16; i++) {
            randomHex += Math.floor(Math.random() * 16).toString(16);
        }
    
        return `${timeHex.slice(0, 8)}-${timeHex.slice(8, 12)}-7${timeHex.slice(13, 16)}-${randomHex.slice(0, 4)}-${randomHex.slice(4)}`;
    }

    public static generateRandom(length: number, option: { 
        isSetNumber?: boolean;
        isSetLowerAlphabet?: boolean;
        isSetUpperAlphabet?: boolean;
        isSetSymbol?: boolean;
        isExcludeSimilerChar?: boolean;
        excludeStrings?: string[];
        maxAttenpts?: number;
    }): string {

        let characters = '';
        if (option.isSetNumber === true) {
            characters += '0123456789';
        }

        if (option.isSetLowerAlphabet === true) {
            characters += 'abcdefghijklmnopqrstuvwxyz';
        }

        if (option.isSetUpperAlphabet === true) {
            characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }

        if (option.isSetSymbol === true) {
            characters += '!@$%^&*?-_+=';
        }

        if (option.isExcludeSimilerChar === true) {
            const excludeChars = ['0', '1', 'o', 'O', 'i', 'I', 'l', 'L'];
            for (const c of excludeChars) {
                characters = characters.replace(c, '');
            }
        }

        let str = '';
        const maxAttempts = option.maxAttenpts ?? 10000;

        let attempts = 0;
        while (attempts < maxAttempts) {
            str = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                str += characters[randomIndex];
            }

            if (option.excludeStrings === undefined || option.excludeStrings.includes(str) === false) {
                break;
            }
            attempts++;
        }

        if (attempts === maxAttempts) {
            throw new Error("文字列生成でループ上限に達しました。");
        }

        return str;
    }

    public static isUUID(value: any): value is string {
        if (typeof value !== 'string') {
            return false;
        }

        const pattern = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');
        return pattern.test(value);
    }

    public static isHttps(value: any, extensions?: string[] | string): value is string {
        if (typeof value !== 'string') {
            return false;
        }

        if (value.startsWith("https://") === false) {
            return false;
        }

        if (extensions === undefined) {
            return true;
        }

        return this.isExistExtension(value, typeof extensions === 'string' ? [extensions] : extensions);
    }

    public static isExistExtension(value: any, extensions: string[]): value is string {
        if (typeof value !== 'string') {
            return false;
        }

        const extension = value.split(".").pop();
        return extensions.includes(extension ?? '');
    }

    /**
     * 値がメールアドレス形式であるかどうかを検証します
     * Validates if the given value is in the format of an email address
     * @param value - 検証する値, The value to be validated
     * @returns {boolean} - 値がメールアドレス形式であるかどうか, Whether the value is in the format of an email address
     */
    public static isMail(value: any): value is string {
        if (typeof value !== 'string') {
            return false;
        }

        const pattern = new RegExp('^[a-zA-Z0-9_%+-]+([.][a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9]+([-.]?[a-zA-Z0-9]+)*\\.[a-zA-Z]{2,}$');
        return pattern.test(value);
    }

    public static isBase64(value: any): value is string {
        if (typeof value !== 'string') {
            return false;
        }

        // Data URIの場合はBase64部分だけ抽出
        if (value.startsWith('data:')) {
            const parts = value.split(',');
            if (parts.length !== 2) {
                return false;
            }
            value = parts[1];
        }

        if (value.length % 4 !== 0) {
            return false;
        }
        
        // 基本的なbase64パターン
        // 使用可能な文字
        // ・ アルファベット（A-Z, a-z）
        // ・ 数字（0-9）
        // ・ +と/（基本文字）
        // ・ =（パディング文字）
        const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/;
        return base64Pattern.test(value);
    }

    public static isEmpty(value: string | null | undefined): value is string {
        if (value === undefined || value === null) {
            return true;
        }

        return value.length === 0;
    }
}