export class MoralisProvider {
    _appID: string = ""
    _serverURL: string = "";

    constructor() {
        if (!this.checkEnvVariables()) {
            throw new Error(
                "Missing Moralis Application ID or Server URL. Make sure to set your .env file.",
            );
        }
    }

    getEnvVariables(): { appId: string, serverUrl: string } {
        return { appId: this._appID, serverUrl: this._serverURL }
    }


    // Local functions
    checkEnvVariables(): boolean {
        const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
        const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

        const isServerInfo = APP_ID && SERVER_URL ? true : false;

        if (isServerInfo) {
            this._appID = process.env.REACT_APP_MORALIS_APPLICATION_ID || "Not Defined"
            this._serverURL = process.env.REACT_APP_MORALIS_SERVER_URL || "Not defined"
            return true;
        } else {
            return false
        }

    }
}