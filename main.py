radio.set_group(11)
basic.clear_screen()
ongoing = False
finish = False
start = 0
stop = 0

def on_button_pressed_a():
    RunComp.set_light_level()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    basic.show_number((stop - start) / 1000)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_light_drop():
    global finish, stop, start
    if not finish:
        if ongoing:
            music.play_tone(Note.D, music.beat())
            radio.send_number(1)
            stop = control.millis()
        else:
            start = control.millis()
            radio.send_number(2)
            music.play_tone(Note.E, music.beat())
        finish = True

def on_received_number(number):
    global ongoing, start, stop
    if number == 0:
        music.play_tone(Note.B, music.beat())
        control.reset()
    if number == 2:
        ongoing = True
        start = control.millis()
    elif number == 1:
        ongoing = False
        stop = control.millis()
radio.on_received_number(on_received_number)
        
def on_forever():
    if input.logo_is_pressed():
         radio.send_number(0)
         music.play_tone(Note.B, music.beat())
         control.reset()
basic.forever(on_forever)

RunComp.on_light_drop(on_light_drop)