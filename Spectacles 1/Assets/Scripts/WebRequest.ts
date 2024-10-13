@component
export class WebRequest extends BaseScriptComponent {
    @input remoteServiceModule: RemoteServiceModule

    onAwake() {
        
    }

    performApiRequest(url, method, json) {
        const request = RemoteServiceHttpRequest.create();
        request.method = method;
        request.url = url;
        request.body = json;
        print("API TRIGGERED");
        this.remoteServiceModule.performHttpRequest(request, (response) => {
            print(`HTTP CODE ${response.statusCode}`)
            print(`Content-Type: ${response.contentType}`)
            print(`Headers: ${JSON.stringify(response.headers)}`)
            print(response.body)
        })
    }
}