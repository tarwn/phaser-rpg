import * as Phaser from "phaser";

export class WorldScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  cameraFocus!: Phaser.Geom.Point;
  spawns!: Phaser.Physics.Arcade.Group;

  constructor() {
    super("WorldScene");
  }

  preload() {
    // preload
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage("spritesheet", "tiles");

    /*const grass =*/ map.createStaticLayer("Grass", tiles, 0, 0);
    const obstacles = map.createStaticLayer("Obstacles", tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    this.player = this.physics.add.sprite(50, 100, "player", 6);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [2, 8, 2, 14]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 6, 0, 12]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameraFocus = new Phaser.Geom.Point(this.player.x, this.player.y);
    this.cameras.main.startFollow(this.cameraFocus);
    this.cameras.main.roundPixels = true;

    this.physics.add.collider(this.player, obstacles);

    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      this.spawns.add(new Phaser.GameObjects.Zone(this, x, y, 20, 20));
    }

    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, undefined, this);

    this.sys.events.on("wake", this.wake, this);
  }

  wake() {
    this.cursors?.left?.reset();
    this.cursors?.right?.reset();
    this.cursors?.up?.reset();
    this.cursors?.down?.reset();
  }

  onMeetEnemy(player: any, zone: any) {
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    this.cameras.main.shake(300);
    this.time.addEvent({
      delay: 350,
      callback: () => {
        this.scene.switch("BattleScene");
      },
      callbackScope: this
    });
  }

  update() {
    this.player.setVelocity(0);

    // Horizontal movement
    if (this.cursors?.left?.isDown) {
      this.player.setVelocityX(-80);
      this.player.anims.play("left", true);
    } else if (this.cursors?.right?.isDown) {
      this.player.setVelocityX(80);
      this.player.anims.play("right", true);
    } else if (this.cursors?.up?.isDown) {
      this.player.setVelocityY(-80);
      this.player.anims.play("up", true);
    } else if (this.cursors?.down?.isDown) {
      this.player.setVelocityY(80);
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }

    // follow a camera focus that doesn't have partial pixels - removes tile tearing/borders
    this.cameraFocus.x = Math.floor(this.player.x);
    this.cameraFocus.y = Math.floor(this.player.y);
  }
}
