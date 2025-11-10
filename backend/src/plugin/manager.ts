import { Source,Title,Plugin,usable,valid_plugin } from "sdk";
import path from 'path';
import fs from 'fs';

// TEST THIS MANAGER


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
            error(`Plugin ${plugin.name}.${String(method)} failed:`, err);
        }
    });

    await Promise.all(promises);
    return results;
}

export class PluginManager {
    plugins: Plugin[];
    constructor(plugins: Plugin[]) {
        this.plugins = plugins;
    }

    async combined_sources(query: string, season?: number, episode?: number) {
        // update later
    }

    async combined_search(query: string) {
        const results: Title[] = await call_plugin_method(this.plugins,'provideSearch','epic testing') // TEST LATER
        for (const result of results) {
            console.log(result.title_name)
        } // update later
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
        const action = plugin.disabled ? "shutdown" : "initialize";
        if (typeof plugin[action] === 'function') {
            plugin[action]();
        }
    }

    async start_manager() {
        const files = fs.readdirSync(CONFIG.plugins_dir).filter(f => f.endsWith(".js"));
        for (const file of files) {
            await this.load_plugin(path.join(CONFIG.plugins_dir, file));
        }
    }
}

