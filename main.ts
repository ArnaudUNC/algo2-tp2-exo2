input.onButtonPressed(Button.A, function () {
    led.unplot(posX, 4)
    posX += -1
    if (posX < 0) {
        posX = 0
    }
    led.plot(posX, 4)
})
input.onButtonPressed(Button.B, function () {
    led.unplot(posX, 4)
    posX += 1
    if (posX > 4) {
        posX = 4
    }
    led.plot(posX, 4)
})
let x = 0
let posX = 0
let perdu = false
posX = 0
let loopsBeforeNewEnnemy = 2
let score = 0
led.plot(posX, 4)
led.plot(0, 0)
let ennemyIsOnColumn = [false, false, false, false, false]
basic.forever(function () {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 3; y++) {
            if (led.point(x, y)) {
                led.unplot(x, y)
                if (y + 1 == 4) {
                    if (led.point(x, 4)) {
                        music.playTone(262, music.beat(BeatFraction.Quarter))
                        score += 1
                        ennemyIsOnColumn[x] = false
                    } else {
                        perdu = true
                    }
                } else {
                    led.plot(x, y + 1)
                    break;
                }
            }
        }
    }
    loopsBeforeNewEnnemy += -1
    if (loopsBeforeNewEnnemy < 0) {
        loopsBeforeNewEnnemy = 2
        x = randint(0, 4)
        if (!(ennemyIsOnColumn[x])) {
            ennemyIsOnColumn[x] = true
            led.plot(x, 0)
        }
    }
    basic.pause(500)
    if (perdu) {
        while (true) {
            basic.showString("Score:" + score)
        }
    }
})
