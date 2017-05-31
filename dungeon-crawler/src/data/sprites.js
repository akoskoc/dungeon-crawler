const sprites = {
    dirt: new Sprite("./img/dirt.png"),
    floor: new Sprite("./img/floor.png"),
    player: new Sprite("./img/player.png"),
    skeleton: new Sprite("./img/skeleton.png"),
    potion: new Sprite("./img/potion.png"),
    torch: new Sprite("./img/torch.png"),
    wall: new Sprite("./img/wall.png"),
    chest: new Sprite("./img/chest.png"),
    bat: new Sprite("./img/bat.png"),
    portal: new Sprite("./img/portal.png"),
    door: new Sprite("./img/door.png"),
    miniboss: new Sprite("./img/miniboss.png"),
    finalboss: new Sprite("./img/finalboss.png")
}

function Sprite(url) {
    this.img = new Image()
    this.img.src = url
}

export default sprites
