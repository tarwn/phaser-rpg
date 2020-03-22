import * as Phaser from "phaser";
import { PlayerCharacter } from "../units/Player";
import { Enemy } from "../units/Enemy";

export class BattleScene extends Phaser.Scene {
  graphics!: Phaser.GameObjects.Graphics;
  heroes!: PlayerCharacter[];
  enemies!: Enemy[];
  units!: PlayerCharacter[];
  index = -1;

  constructor() {
    super("BattleScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");

    this.startBattle();
    this.sys.events.on("wake", this.startBattle, this);
  }

  private startBattle() {
    const warrior = new PlayerCharacter(this, 250, 50, "player", 1, "Warrior", 100, 20);
    this.add.existing(warrior);

    const mage = new PlayerCharacter(this, 250, 100, "player", 4, "Mage", 80, 8);
    this.add.existing(mage);

    const enemy1 = new Enemy(this, 50, 50, "dragons", 63, "Skeleton", 50, 3);
    this.add.existing(enemy1);

    const enemy2 = new Enemy(this, 50, 100, "dragons", 61, "Troll", 50, 3);
    this.add.existing(enemy2);

    this.heroes = [warrior, mage];
    this.enemies = [enemy1, enemy2];
    this.units = this.heroes.concat(this.enemies);

    this.index = -1;

    this.scene.run("UIScene");
  }

  public nextTurn() {
    this.units.forEach(u => u.stepBack());

    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }

    do {
      this.index++;
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);

    if (this.units[this.index]) {
      if (this.units[this.index] instanceof PlayerCharacter) {
        this.units[this.index].stepForward();
        this.events.emit("PlayerSelect", this.index);
      } else {
        let r = -1;
        do {
          r = Math.floor(Math.random() * this.heroes.length);
        } while (!this.heroes[r].living);
        this.units[this.index].stepForward();
        this.units[this.index].attack(this.heroes[r]);
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    }
  }

  private checkEndBattle() {
    const victory = this.enemies.find(e => e.living) === undefined;
    const gameOver = this.heroes.find(e => e.living) === undefined;
    return victory || gameOver;
  }

  private endBattle() {
    this.heroes.length = 0;
    this.enemies.length = 0;
    this.units.forEach(u => u.destroy());
    this.units.length = 0;
    this.scene.sleep("UIScene");
    this.scene.switch("WorldScene");
  }

  receivePlayerSelection(action: string, target: number) {
    if (action === "attack") {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  private exitBattle() {
    this.scene.sleep("UIScene");
    this.scene.switch("WorldScene");
  }
}
