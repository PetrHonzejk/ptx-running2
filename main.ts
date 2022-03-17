radio.setGroup(11)
basic.clearScreen()
let ongoing = false
let finish = false
let start = 0
let stop = 0
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    RunComp.SetLightLevel()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    basic.showNumber((stop - start) / 1000)
})
radio.onReceivedNumber(function on_received_number(number: number) {
    
    if (number == 0) {
        music.playTone(Note.B, music.beat())
        control.reset()
    }
    
    if (number == 2) {
        ongoing = true
        start = control.millis()
    } else if (number == 1) {
        ongoing = false
        stop = control.millis()
    }
    
})
basic.forever(function on_forever() {
    if (input.logoIsPressed()) {
        radio.sendNumber(0)
        music.playTone(Note.B, music.beat())
        control.reset()
    }
    
})
RunComp.OnLightDrop(function on_light_drop() {
    
    if (!finish) {
        if (ongoing) {
            music.playTone(Note.D, music.beat())
            radio.sendNumber(1)
            stop = control.millis()
        } else {
            start = control.millis()
            radio.sendNumber(2)
            music.playTone(Note.E, music.beat())
        }
        
        finish = true
    }
    
})
