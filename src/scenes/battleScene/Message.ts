import * as Phaser from "phaser";

export class Message extends Phaser.GameObjects.Container {
  text: Phaser.GameObjects.Text;
  hideEvent: Phaser.Time.TimerEvent | null = null;

  constructor(scene: Phaser.Scene, events: Phaser.Events.EventEmitter) {
    super(scene, 160, 30);
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(-90, -15, 180, 30);
    graphics.fillRect(-90, -15, 180, 30);
    const textStyle: any = {
      color: "#ffffff",
      align: "center",
      fontSize: 13,
      wordWrap: { width: 160, useAdvancedWrap: true }
    };
    this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", textStyle);
    this.add(this.text);
    this.text.setOrigin(0.5);
    events.on("Message", this.showMessage, this);
    this.visible = false;
  }

  showMessage(text: string) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) {
      this.hideEvent.remove(false);
    }
    this.hideEvent = this.scene.time.addEvent({
      delay: 2000,
      callback: this.hideMessage,
      callbackScope: this
    });
  }

  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  }
}
