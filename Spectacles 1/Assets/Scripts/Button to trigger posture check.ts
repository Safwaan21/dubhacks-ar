@component
export class PostureCheckButton extends BaseScriptComponent {
    onAwake() {
//        script.createEvent("TouchEndEvent").bind(onButtonPressed);
    }
    //// Triggered when the button is pressed
    onButtonPressed() {
        print("Hi");
    }
}

