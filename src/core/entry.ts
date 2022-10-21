import * as vscode from "vscode";
import provider from "./provider";

const {
    bianGengDanAddProvider,
    bianGengDanModifyProvider,
    bianGengDanDeleteProvider,
} = provider;

// 添加变更单
export const addEntry = (args: any[]) => {
    const status = args[0].status;

    if (status === "A") {
        bianGengDanAddProvider.add(args[0]);
        bianGengDanAddProvider.refresh();
    } else if (status === "M") {
        bianGengDanModifyProvider.add(args[0]);
        bianGengDanModifyProvider.refresh();
    } else if (status === "D") {
        bianGengDanDeleteProvider.add(args[0]);
        bianGengDanDeleteProvider.refresh();
    }
};

// 删除变更单
export const deleteEntry = (args: any[]) => {
    const status = args[0].status;

    if (status === "A") {
        bianGengDanAddProvider.delete(args[0]);
        bianGengDanAddProvider.refresh();
    } else if (status === "M") {
        bianGengDanModifyProvider.delete(args[0]);
        bianGengDanModifyProvider.refresh();
    } else if (status === "D") {
        bianGengDanDeleteProvider.delete(args[0]);
        bianGengDanDeleteProvider.refresh();
    }
};

// 导出变更单
export const exportEntryFn = () => {
    const options: vscode.OpenDialogOptions = {
        canSelectMany: false,
        canSelectFolders: true,
        canSelectFiles: false,
        openLabel: "Open",
    };

    vscode.window.showOpenDialog(options).then((fileUri) => {
        if (fileUri && fileUri[0]) {
            const toUri = fileUri[0].fsPath + "/";
            bianGengDanAddProvider.export(toUri);
            bianGengDanModifyProvider.export(toUri);
        }
    });
};