export class PluginManager {
    plugins: Plugin[];
    constructor(plugins: Plugin[]) {
        this.plugins = plugins;
    }
}

export class Plugin {
    name: string;
    exports: Function[];
    id: number;
    disabled: boolean = false;
    constructor(name: string, exports: Function[], id: number, disabled: boolean = false) {
        this.name = name;
        this.exports = exports;
        this.id = id;
        this.disabled = disabled;
    }
}