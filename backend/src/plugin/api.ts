enum TitleType {
    MOVIE = 1,
    SHOW = 2
}

interface Source {
    url: string;
    server_name?: string;

}

interface Title {
    title_name: string;
    type: TitleType;
    display_url: string;
}

export interface TitleRow {
    row_name: string;
    titles: Title[];
}

interface Plugin {
    name: string;
    exports: Function[];
    id: number;
    disabled: boolean;
    initialize(): void;
    
    provideSearch(): Title[];
    provideSources(): Source[];
    provideHomepage(): TitleRow[];

    shutdown?(): void;
}

export { TitleType,Title,Plugin }