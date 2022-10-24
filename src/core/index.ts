import * as vscode from "vscode";

// 变更单基础类
export default class BianGengDan extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        private status: string,
        public fullPathName: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.fullPathName}`;
        this.description = this.fullPathName;
        this.resourceUri = vscode.Uri.file(this.label);
        this.command = {
            command: "biangengdan.openFile",
            title: this.label,
            arguments: [this.fullPathName]
        };
    }

    getStatus(): string {
        return this.status;
    }
}