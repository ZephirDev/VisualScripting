import {EventsEnum} from "./events.enum";

export const PriorityEventsEnum = {
    MESSAGE_EVENT: {
        PRE_HANDLE: -10_000,
        HANDLE: -1_000,
        POST_HANDLE: -100,
        PRE_WRITE: 100,
        WRITE: 1_000,
        POST_WRITE: 10_000
    },
    MESSAGE_RESULT_EVENT: {
        PRE_HANDLE: -10_000,
        HANDLE: 0,
        POST_HANDLE: 10_000,
    },
    MESSAGE_SEND_EVENT: {
        PRE_HANDLE: -10_000,
        HANDLE: 0,
        POST_HANDLE: 10_000,
    },
};