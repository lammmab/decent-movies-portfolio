import { Source,Plugin,usable } from "sdk";

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
                warn(`Plugin ${plugin.constructor.name}.${String(method)} returned non-array`);
            }
        } catch (err) {
            error(`Plugin ${plugin.constructor.name}.${String(method)} failed:`, err);
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
        const sources = await call_plugin_method(this.plugins,'provideSearch','test',1,1) // TEST LATER
    }

    async combined_search(query: string) {
        // loop through plugins that provideSearch , return their search results or exclude
        // if there's invalid stuff found
    }

    async load_plugin(filepath: string) {
        // pull the plugin's exports
        // verify that it is a plugin and map to a Plugin
        // run initialization function
        // add into this.plugins
    }

    toggle_plugin(plugin: Plugin) {
        plugin.disabled = !plugin.disabled;
    }

    start_manager() {
        // read CONFIG.plugins_dir and grab all JS files
        // run load plugin for each file
    }
}

