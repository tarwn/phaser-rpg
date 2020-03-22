import * as Phaser from "phaser";
import { HeroesMenu } from "./battleScene/HeroesMenu";
import { ActionsMenu } from "./battleScene/ActionsMenu";
import { EnemiesMenu } from "./battleScene/EnemiesMenu";
import { Menu } from "./battleScene/Menu";
import { BattleScene } from "./BattleScene";
import { Message } from "./battleScene/Message";

export class UIScene extends Phaser.Scene {
  menus!: Phaser.GameObjects.Container;
  heroesMenu!: HeroesMenu;
  actionsMenu!: ActionsMenu;
  enemiesMenu!: EnemiesMenu;
  currentMenu!: Menu | null;
  battleScene!: BattleScene;
  message!: Message;
  graphics!: Phaser.GameObjects.Graphics;

  constructor() {
    super("UIScene");
  }

  create() {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(2, 150, 90, 100);
    this.graphics.fillRect(2, 150, 90, 100);
    this.graphics.strokeRect(95, 150, 90, 100);
    this.graphics.fillRect(95, 150, 90, 100);
    this.graphics.strokeRect(188, 150, 130, 100);
    this.graphics.fillRect(188, 150, 130, 100);

    this.menus = this.add.container(0, 0);
    this.heroesMenu = new HeroesMenu(this, 195, 153);
    this.actionsMenu = new ActionsMenu(this, 100, 153);
    this.enemiesMenu = new EnemiesMenu(this, 8, 153);

    this.currentMenu = this.actionsMenu;

    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    this.battleScene = this.scene.get("BattleScene") as BattleScene;

    this.input.keyboard.on("keydown", this.onKeyInput, this);
    this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);
    this.events.on("SelectEnemies", this.onSelectEnemies, this);
    this.events.on("Enemy", this.onEnemy, this);
    this.sys.events.on("wake", this.createMenu, this);

    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.createMenu();
  }

  createMenu() {
    this.remapHeroes();
    this.remapEnemies();
    this.battleScene.nextTurn();
  }

  onKeyInput(event: any) {
    console.log(this.currentMenu);
    if (this.currentMenu) {
      switch (event.code) {
        case "ArrowUp":
          this.currentMenu.moveSelectionUp();
          break;
        case "ArrowDown":
          this.currentMenu.moveSelectionDown();
          break;
        case "ArrowRight":
        case "Shift":
          break;
        case "ArrowLeft":
        case "Space":
          this.currentMenu.confirm();
          break;
      }
    }
  }

  onPlayerSelect(id: number) {
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  }

  onSelectEnemies() {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
  }

  onEnemy(index: number) {
    console.log("onEnemy");
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection("attack", index);
  }

  remapHeroes() {
    this.heroesMenu.remap(this.battleScene.heroes);
  }

  remapEnemies() {
    this.enemiesMenu.remap(this.battleScene.enemies);
  }
}
