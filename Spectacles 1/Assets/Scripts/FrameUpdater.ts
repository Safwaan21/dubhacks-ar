@component
export class FrameUpdater extends BaseScriptComponent {
    private frame_cnt = 0;
    onAwake() {
        this.createEvent("UpdateEvent").bind(() => this.onUpdate());
    }
    
    onUpdate() {
        if (this.frame_cnt == 0) {
            print("This is running on each 5th");
        }
        this.frame_cnt = 2;
    }
}
