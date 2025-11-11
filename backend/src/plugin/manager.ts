import { 
    Source, 
    Title, 
    Plugin, 
    usable, 
    valid_plugin, 
    TitleRow 
} from "./api";

import path from 'path';
import fs from 'fs';

type AsyncPluginFunction<R = any> = (...args: any[]) => Promise<R[]>;

async function call_plugin_method<K extends keyof Plugin, R>(
    plugins: Plugin[],
    method: K,
    ...args: Parameters<Plugin[K] & AsyncPluginFunction<R>>
): Promise<R[]> {
    const results: R[] = [];

    const promises = plugins.map(async plugin => {
        if (!usable(plugin,method)) { return; }

        try {
            const fn = plugin[method]! as AsyncPluginFunction<R>;
            const pluginResult = await fn(...args);

            if (Array.isArray(pluginResult)) {
                results.push(...pluginResult.filter(r => r != null));
            } else {
                warn(`Plugin ${plugin.name}.${String(method)} returned non-array`);
            }
        } catch (err) {
            error(`Plugin ${plugin.name}.${String(method)} failed: `, err);
        }
    });

    await Promise.all(promises);
    return results;
}

export class PluginManager {
    plugins: Plugin[] = [];
    constructor() {};

    async combined_homepage(): Promise<TitleRow[] | null> {
        const full_page: TitleRow[] = await call_plugin_method(this.plugins,'provideHomepage');
        if (full_page.length == 0) {
            return null;
        } else {
            return full_page;
        }
    }

    async combined_sources(query: string, season?: number, episode?: number): Promise<Source[] | null> {
        const results: Source[] = await call_plugin_method(this.plugins,'provideSources',query,season,episode);
        if (results.length == 0) {
            return null;
        } else {
            return results;
        }
    }

    async combined_search(query: string): Promise<Title[] | null> {
        const results: Title[] = await call_plugin_method(this.plugins,'provideSearch',query)
        if (results.length == 0) {
            return null;
        } else {
            return results;
        }
    }

    async load_plugin(filepath: string) {
        const pluginModule = await import(path.resolve(filepath));
        const plugin: Plugin = pluginModule.default ?? pluginModule;

        if (!valid_plugin(plugin)) {
            return;
        }

        if (typeof plugin.initialize === 'function') {
            plugin.initialize();
        }
        this.plugins.push(plugin);
        info(`Plugin ${plugin.name} loaded successfully.`)
    }

    toggle_plugin(plugin: Plugin) {
        plugin.disabled = !plugin.disabled;
        info(`Plugin ${plugin.name} now ${plugin.disabled ? "disabled" : "enabled"}`)
        const action = plugin.disabled ? "shutdown" : "initialize";
        if (typeof plugin[action] === 'function') {
            plugin[action]();
        }
    }

    async start_manager() {
        const chosen_folder = path.join(ROOT_DIR, CONFIG.plugins_dir);
        const files = fs.readdirSync(chosen_folder).filter(f => f.endsWith(".js"));
        for (const file of files) {
            info(`Loading plugin file ${file}`)
            await this.load_plugin(path.join(CONFIG.plugins_dir, file));
        }
    }
}