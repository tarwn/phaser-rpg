import * as Phaser from "phaser";

export class MenuItem extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, text: string | string[]) {
    super(scene, x, y, text, { color: "#ffffff", align: "left", fontSize: "15" });
  }

  public select() {
    this.setColor("#f8ff38");
  }

  public deselect() {
    this.setColor("#ffffff");
  }

  public unitKilled() {
    this.active = false;
    this.visible = false;
  }
}
