import * as vscode from "vscode";

export default class BianGengDan extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        private status: string,
        public fullPathName: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.status}: ${this.fullPathName}`;
        this.description = this.fullPathName;
        this.resourceUri = vscode.Uri.file(this.label);
    }
}