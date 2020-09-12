import { defineEntity } from "../classes/entity.js";

export async function loadEntityDefinition(entityName) {
    const response = await fetch(`./entity-definitions/${entityName}.json`);
    return defineEntity(await response.json());
}

export const loadConfig = (async () => {
    // TODO: attempt to load from local storage before loading from network, to allow for player overrides
    // If there is a newer version of config than what is in local storage, merge keys before overwriting

    const configKeys = [
        "keys"
    ];

    const loadConfig = configKey => fetch(`./config/${configKey}.json`).then(response => response.json());
    const loadedConfigs = await Promise.all(configKeys.map(loadConfig));

    const config = {};

    for (let i = 0; i < configKeys.length; i++) {
        config[configKeys[i]] = loadedConfigs[i];
    }

    return config;

})();