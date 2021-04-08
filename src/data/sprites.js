const sprites = {
    dirt: new Sprite("./img/sprites/dirt.png"),
    floor: new Sprite("./img/sprites/floor.png"),
    player: new Sprite("./img/sprites/player.png"),
    skeleton: new Sprite("./img/sprites/skeleton.png"),
    potion: new Sprite("./img/sprites/potion.png"),
    torch: new Sprite("./img/sprites/torch.png"),
    wall: new Sprite("./img/sprites/wall.png"),
    chest: new Sprite("./img/sprites/chest.png"),
    bat: new Sprite("./img/sprites/bat.png"),
    portal: new Sprite("./img/sprites/portal.png"),
    door: new Sprite("./img/sprites/door.png"),
    miniboss: new Sprite("./img/sprites/miniboss.png"),
    finalboss: new Sprite("./img/sprites/finalboss.png"),
    dead: new Sprite("./img/background/died.png"),
    won: new Sprite("./img/background/won.png")
}

function Sprite(url) {
    this.img = new Image()
    this.img.src = url
}

export default sprites
