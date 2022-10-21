import * as vscode from "vscode";
import * as path from "path";
import { getRootPath } from "../util/config";

// 打开文件
export function openFile(args: any[]) {
    const uri = vscode.Uri.file(path.join(getRootPath(), args[0]));
    vscode.workspace.openTextDocument(uri).then(doc => {
        vscode.window.showTextDocument(doc);
    });
}