@component
export class FrameUpdater extends BaseScriptComponent {
    @input
    head: SceneObject;
    @input
    left_hand: SceneObject;
    @input
    remoteServiceModule: RemoteServiceModule
    @input
    right_hand: SceneObject;
    private frame_cnt = 0;
    private REFRESH_TIMEOUT = 1; // # of seconds we want between refreshes of data
    private API_URL = "https://dubhacks-api.onrender.com/";
    onAwake() {
        this.createEvent("UpdateEvent").bind(() => this.onUpdate());
    }
    
    onUpdate() {
        let frame_timeout = this.REFRESH_TIMEOUT * 30;
//        Every X seconds, collect a snapshot and push it
        if (this.frame_cnt == frame_timeout) {
            print("1")
            this.collectStats();
            this.frame_cnt = 0
        }
        else {
            this.frame_cnt++;   
        }
    }
    
    public performApiRequest(url, method, body) {
        const request = RemoteServiceHttpRequest.create();
        request.method = method;
        request.url = url;
        const data = { "data": body };
        request.body = JSON.stringify(data);
        print("API TRIGGERED");
        this.remoteServiceModule.performHttpRequest(request, (response) => {
            print(`HTTP CODE ${response.statusCode}`)
//            print(`Content-Type: ${response.contentType}`)
//            print(`Headers: ${JSON.stringify(response.headers)}`)
            print(response.body)
        })
    }
    
    collectStats() {
        const head_data = { 
            position: { x: this.head.getTransform().getLocalPosition().x, y: this.head.getTransform().getLocalPosition().y, z: this.head.getTransform().getLocalPosition().z},
            rotation: { x: this.head.getTransform().getLocalRotation().x, y: this.head.getTransform().getLocalRotation().y, z: this.head.getTransform().getLocalRotation().z, w: this.head.getTransform().getLocalRotation().w}
        };
        
        const hand_data = { 
            left: {
                
            
            position: { x: this.left_hand.getTransform().getLocalPosition().x, y: this.left_hand.getTransform().getLocalPosition().y, z: this.left_hand.getTransform().getLocalPosition().z},
            rotation: { x: this.left_hand.getTransform().getLocalRotation().x, y: this.left_hand.getTransform().getLocalRotation().y, z: this.left_hand.getTransform().getLocalRotation().z, w: this.left_hand.getTransform().getLocalRotation().w}
            },
            right: {
            position: { x: this.right_hand.getTransform().getLocalPosition().x, y: this.right_hand.getTransform().getLocalPosition().y, z: this.right_hand.getTransform().getLocalPosition().z},
            rotation: { x: this.right_hand.getTransform().getLocalRotation().x, y: this.right_hand.getTransform().getLocalRotation().y, z: this.right_hand.getTransform().getLocalRotation().z, w: this.right_hand.getTransform().getLocalRotation().w}
            
                
            }
            };
        
        const full_data = {head: head_data, hand: hand_data};
//        this.performApiRequest("https://dubhacks-api.onrender.com/sendData/", RemoteServiceHttpRequest.HttpRequestMethod.Post, full_data);
    }
}
