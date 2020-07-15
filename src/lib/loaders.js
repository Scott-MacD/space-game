import { defineEntity } from "../classes/entity.js";

export async function loadEntityDefinition(entityName) {
    const response = await fetch(`./entity-definitions/${entityName}.json`);
    return defineEntity(await response.json());
}