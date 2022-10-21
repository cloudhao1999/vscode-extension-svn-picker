import * as vscode from 'vscode';

// 获取配置项
export function getConfiguration<T extends any>(property: string): T {
    return vscode.workspace.getConfiguration('biangengdan').get(property)!;
};

// 获取项目根目录
export function getRootPath(): string {
    const rootPath =
        vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : undefined;

    return rootPath!;
}
