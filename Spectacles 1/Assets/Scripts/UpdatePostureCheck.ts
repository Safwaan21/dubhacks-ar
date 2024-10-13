@component
export class UpdatePostureCheck extends BaseScriptComponent {
    @input
    textComponent: Text;
    onAwake() {
        
    }
    
    public update(newText) {
        this.textComponent.text = newText;
    }
}
