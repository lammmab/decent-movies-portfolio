enum AlertType {
    WARNING = "warn",
    SUCCESS = "success",
    ERROR = "error",
    INFORMATION = "info",
}

enum TitleType {
    MOVIE = 1,
    SHOW = 2
}

export { AlertType,TitleType }

export interface Title {
    title_name: string;
    type: TitleType;
    display_url: string;
}

export type Config = {
    debug: boolean
    port: number;
    plugins_dir: string;
    whitelisted: boolean;
    whitelist: string[] | null;
    password_protected: boolean;
    admin_passwords?: String[];
    user_passwords?: String[];
}