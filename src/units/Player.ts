import { Unit } from "./Unit";

export class PlayerCharacter extends Unit {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | number | undefined,
    type: string,
    hp: number,
    damage: number
  ) {
    super(scene, x, y, -20, texture, frame, type, hp, damage);
    this.flipX = true;
    this.setScale(2);
  }
}
