export const VisualScriptingIpcErrorEnum = {
    VisualScriptingIpcHandlerExist: {
        code: 500_001,
        what: "The IPC handler already exist.",
    },
    VisualScriptingIpcNoHandlerForMessage: {
        code: 500_002,
        what: "The IPC decorator doesn't have an handler for this method.",
    },
    VisualScriptingIpcMessageTimeout: {
        code: 500_003,
        what: "The IPC decorator timeout the message answer.",
    },
    VisualScriptingIpcMessageEmptyReply: {
        code: 500_004,
        what: "The IPC decorator recieve a message with an empty result where he except something not null.",
    },
    VisualScriptingIpcNotReady: {
        code: 500_005,
        what: "The IPC decorator is not ready. Please call listen().",
    },
    VisualScriptingIpcRunning: {
        code: 500_006,
        what: "The IPC decorator is running. You can't handler after that.",
    },
    VisualScriptingIpcAbstractFileNameViolation: {
        code: 500_007,
        what: "The path or the filename contains invalid character.",
    },
    VisualScriptingIpcPathDoesntExists: {
        code: 500_008,
        what: "The path leads to an unexisting file.",
    },
    VisualScriptingIpcProjectExists: {
        code: 500_009,
        what: "The path leads to an already existing project.",
    },
    VisualScriptingIpcNoOpenProject: {
        code: 500_010,
        what: "There is no open project.",
    },
    VisualScriptingIpcFileIsNotProjectFile: {
        code: 500_011,
        what: "The given file is not a project file.",
    }
}
