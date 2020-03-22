import * as Phaser from "phaser";
import { Menu } from "./Menu";

export class EnemiesMenu extends Menu {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, "Enemies", x, y, []);
  }

  public confirm() {
    this.scene.events.emit("Enemy", this.menuItemIndex);
  }
}
