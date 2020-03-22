import * as Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // map tiles
    this.load.image("tiles", "assets/map/spritesheet.png");

    // map in json format
    this.load.tilemapTiledJSON("map", "assets/map/map.json");

    this.load.spritesheet("player", "assets/RPG_assets.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("dragons", "assets/DRAGON_by_Mike_Hackett_alpha.png", {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.scene.start("WorldScene");
  }
}
