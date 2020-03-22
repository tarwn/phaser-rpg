import * as Phaser from "phaser";
import { MenuItem } from "../scenes/battleScene/MenuItem";

export class Unit extends Phaser.GameObjects.Sprite {
  type: string;
  maxHp: number;
  hp: number;
  damage: number;
  living: boolean;
  menuItem: MenuItem | null;
  activeX: number;
  originalX: number;
  originalY: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    activeX: number,
    texture: string,
    frame: string | number | undefined,
    type: string,
    hp: number,
    damage: number
  ) {
    super(scene, x, y, texture, frame);
    this.type = type;
    this.maxHp = this.hp = hp;
    this.damage = damage;
    this.living = true;
    this.menuItem = null;
    this.activeX = activeX;
    this.originalX = x;
    this.originalY = y;
  }

  public setMenuItem(item: any) {
    this.menuItem = item;
  }

  public stepForward() {
    this.setX(this.originalX + this.activeX);
  }

  public stepBack() {
    this.setX(this.originalX);
  }

  public attack(target: Unit) {
    if (target.living) {
      target.takeDamage(this.damage);
      this.scene.events.emit(
        "Message",
        `${this.type} attacks ${target.type} for ${this.damage} damage`
      );
    }
  }

  public takeDamage(amount: number) {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem?.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  }
}
