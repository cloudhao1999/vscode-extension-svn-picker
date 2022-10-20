import * as vscode from 'vscode';

export function getConfiguration<T extends any>(property: string): T {
    return vscode.workspace.getConfiguration('biangengdan').get(property)!;
};

export function getRootPath(): string {
    const rootPath =
        vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : undefined;

    return rootPath!;
}
