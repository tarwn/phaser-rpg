import * as Phaser from "phaser";
import { MenuItem } from "./MenuItem";
import { Unit } from "../../units/Unit";

export abstract class Menu extends Phaser.GameObjects.Container {
  name: string;
  menuItems: MenuItem[];
  menuItemIndex: number;
  heroes: Phaser.GameObjects.GameObject[];

  constructor(
    scene: Phaser.Scene,
    name: string,
    x: number,
    y: number,
    heroes: Phaser.GameObjects.GameObject[]
  ) {
    super(scene, x, y, heroes);
    this.name = name;
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.heroes = heroes;
    // TODO - necessary? or does super handle this
    this.x = x;
    this.y = y;
  }

  public addMenuItem(unit: string) {
    const menuItem = new MenuItem(this.scene, 0, this.menuItems.length * 20, unit);
    this.menuItems.push(menuItem);
    this.add(menuItem);
    return menuItem;
  }

  public clear() {
    this.menuItems.forEach(mi => mi.destroy());
    this.menuItemIndex = 0;
    this.menuItems.length = 0;
  }

  public remap(units: Phaser.GameObjects.GameObject[]) {
    this.clear();
    units.forEach(u => (u as Unit).setMenuItem(this.addMenuItem(u.type)));
    this.menuItemIndex = 0;
  }

  public moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex--;
      if (this.menuItemIndex < 0) {
        this.menuItemIndex = this.menuItems.length - 1;
      }
    } while (!this.menuItems[this.menuItemIndex].active);

    this.menuItems[this.menuItemIndex].select();
  }

  public moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length) {
        this.menuItemIndex = 0;
      }
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  }

  public select(index: number | undefined) {
    if (index == null) {
      index = 0;
    }
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    while (!this.menuItems[this.menuItemIndex].active) {
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length) {
        this.menuItemIndex = 0;
      }
      if (this.menuItemIndex == index) {
        return;
      }
    }
    this.menuItems[this.menuItemIndex].select();
    // this.selected = true;
  }

  public deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
  }

  abstract confirm(): void;
}
