import * as Phaser from "phaser";
import { Menu } from "./Menu";

export class ActionsMenu extends Menu {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, "Actions", x, y, []);
    this.addMenuItem("Attack");
  }

  public confirm() {
    this.scene.events.emit("SelectEnemies");
  }
}
