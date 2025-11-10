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
    
    provideSearch?(query: string): Promise<Title[]>;
    provideSources?(title: string, season?: number, episode?: number): Promise<Source[]>;
    provideHomepage?(): Promise<TitleRow[]>;
    provideCC?(title: string, season?: number, episode?: number): Promise<string[]>;

    shutdown?(): void;
}

function usable(p: Plugin,f?: keyof Plugin): boolean {
    if (!p.disabled && f && typeof p[f] === 'function') {
        return true;
    }
    return false
}

export { Source,TitleType,Title,Plugin,usable }