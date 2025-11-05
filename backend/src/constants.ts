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