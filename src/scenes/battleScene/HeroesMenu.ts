import * as Phaser from "phaser";
import { Menu } from "./Menu";

export class HeroesMenu extends Menu {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, "Heroes", x, y, []);
  }

  public confirm() {
    // no action
  }
}
