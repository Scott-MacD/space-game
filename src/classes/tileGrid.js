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
            Math.floor((x - this.x) / cellSize),
            Math.floor((y - this.y) / cellSize)
        ];
    },

    panTo({x, y}) {
        const cellSize = this.cellSize;
        this.x = Math.floor(x / cellSize) * cellSize;
        this.y = Math.floor(y / cellSize) * cellSize;
    },

    render(deltaT, {ctx}) {
        const cellSize = this.cellSize;
        if (this.highlightedTile !== null) {
            const [x, y] = this.highlightedTile;
            ctx.translate(this.width/2, this.height/2);
            ctx.strokeStyle = 'orange';
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

});

export default TileGrid;