import { define } from "../lib/record.js";
import Entity from "./entity.js";

const TileGrid = define("TileGrid", Entity, {

    name: "tileGrid",

    cellSize: 16,
    width: 1,
    height: 1,

    tiles: [],
    highlightedTile: null,

    highlightTileAtWorldPos({x, y}) {
        const cellSize = this.cellSize;
        this.highlightedTile = [
            Math.floor(x / cellSize),
            Math.floor(y / cellSize)
        ];
    },

    render(deltaT, {ctx}) {
        const cellSize = this.cellSize;
        if (this.highlightedTile !== null) {
            const [x, y] = this.highlightedTile;

            // const x = 0;
            // const y = 0;

            ctx.translate(this.width/2, this.height/2);
            ctx.strokeStyle = 'orange';
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

});

export default TileGrid;