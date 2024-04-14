import {FC, useEffect} from 'react';
import Phaser from 'phaser';

const PhaserGame: FC = () => {
    useEffect(() => {
        let game: Phaser.Game | null = null;

        class Example extends Phaser.Scene {
            private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
            private logo: Phaser.Physics.Arcade.Image | undefined;

            constructor() {
                super('example');
            }

            public preload(): void {
                this.load.setBaseURL('https://labs.phaser.io');
                this.load.image('sky', 'assets/skies/space3.png');
                this.load.image('logo', 'assets/sprites/phaser3-logo.png');
            }

            public create(): void {
                this.add.image(400, 300, 'sky');

                this.logo = this.physics.add.image(400, 100, 'logo');
                this.logo.setBounce(1, 1);
                this.logo.setCollideWorldBounds(true);

                this.cursors = this.input.keyboard?.createCursorKeys();
            }

            public update(): void {
                if (this.cursors?.left?.isDown) {
                    this.logo?.setVelocityX(-160);
                } else if (this.cursors?.right?.isDown) {
                    this.logo?.setVelocityX(160);
                } else {
                    this.logo?.setVelocityX(0);
                }

                if (this.cursors?.up?.isDown) {
                    this.logo?.setVelocityY(-160);
                } else if (this.cursors?.down?.isDown) {
                    this.logo?.setVelocityY(160);
                } else {
                    this.logo?.setVelocityY(0);
                }
            }
        }

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-game-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0, x: 0 }
                }
            },
            scene: [Example]
        };

        game = new Phaser.Game(config);

        return () => {
            if (game) {
                game.destroy(true);
                game = null;
            }
        };
    }, []);

    return <div id="phaser-game-container" style={{ width: '800px', height: '600px' }} />;
};

export default PhaserGame;
