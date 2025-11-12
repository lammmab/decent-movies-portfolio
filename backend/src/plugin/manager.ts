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
    args: Parameters<Plugin[K] & AsyncPluginFunction<R>>
): Promise<R[]> {
    const results: R[] = [];

    const promises = plugins.map(async plugin => {
        if (!usable(plugin,method)) { return; }

        try {
            const fn = plugin[method]! as AsyncPluginFunction<R>;
            const pluginResult = await fn(args);

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
    plugin_path = path.join(ROOT_DIR, CONFIG.plugins_dir);
    plugins: Plugin[] = [];
    constructor() {};

    async combined<K extends keyof Plugin, R>(
        method: K,
        args: Parameters<Plugin[K] & AsyncPluginFunction<R>>
        ): Promise<R[] | null> {
        const results: R[] = await call_plugin_method(this.plugins, method, args);
        return results.length ? results : null;
    }

    async load_plugin(filepath: string) {
        const pluginModule = await import(path.resolve(filepath));
        const plugin: Plugin = pluginModule.default ?? pluginModule;
        plugin.filepath = filepath;

        if (!valid_plugin(plugin)) {
            return;
        }

        if (typeof plugin.initialize === 'function') {
            plugin.initialize();
        }
        this.plugins.push(plugin);
        info(`Plugin ${plugin.name} loaded successfully.`)
    }

    delete_plugin(plugin: Plugin) {
        if (!plugin.disabled) {
            this.toggle_plugin(plugin);
        }

        this.plugins = this.plugins.filter(function(v) { return v !== plugin })
        fs.unlinkSync(plugin.filepath!);
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
        const files = fs.readdirSync(this.plugin_path).filter(f => f.endsWith(".js"));
        for (const file of files) {
            info(`Loading plugin file ${file}`)
            await this.load_plugin(path.join(this.plugin_path, file));
        }
    }
}