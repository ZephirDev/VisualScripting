import {MessageInterface} from "./message.interface";
import {MessageResultInterface} from "./message-result.interface";

export interface VisualScriptingIpcEventHandlersInterface {
    onMessage?: (messageInterface: MessageInterface<any>) => {},
    onMessageResult?: (messageResultInterface: MessageResultInterface<any>) => {};
    onMessageSend?: (messageInterface: MessageInterface<any>) => {};
    onMessageResultSend?: (messageResultInterface: MessageResultInterface<any>) => {};
}