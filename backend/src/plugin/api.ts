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
    disabled: boolean;
    filepath?: string;
    initialize?(): void;
    
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

function valid_plugin(p: Plugin): boolean {
    if (!p.name) {
        warn("Unnamed plugin found; rendered unusable.");
        return false;
    }

    if (!p.provideSearch && !p.provideHomepage && !p.provideCC && !p.provideSources) {
        warn("Plugin provides no useful functions; rendered unusable.");
        return false;
    }

    return true;
    
}

export { Source,TitleType,Title,Plugin,usable,valid_plugin }