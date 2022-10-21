import * as vscode from "vscode";
import * as cp from "child_process";
import * as path from "path";
import BianGengDan from ".";

export class BianGengDanProvider implements vscode.TreeDataProvider<BianGengDan> {
    constructor(private workspaceRoot: string) { }

    getTreeItem(element: BianGengDan): vscode.TreeItem {
        return element;
    }

    getChildren(): Thenable<BianGengDan[]> {
        return new Promise<BianGengDan[]>((resolve, reject) => {
            if (!this.workspaceRoot) {
                vscode.window.showInformationMessage('No changes in empty workspace');
                return Promise.resolve([]);
            }

            this.getSubVersionTree().then((outPutString) => {
                if (outPutString) {
                    resolve(this.toTreeFile(outPutString));
                } else {
                    reject([]);
                }
            });
        });
    }

    private _onDidChangeTreeData: vscode.EventEmitter<
        BianGengDan | undefined
    > = new vscode.EventEmitter<BianGengDan | undefined>();

    readonly onDidChangeTreeData: vscode.Event<BianGengDan | undefined> = this
        ._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }


    private getSubVersionTree(): Thenable<string | null> {
        return new Promise((c, e) => {
            const res = cp.execSync(`svn status -q`, { cwd: this.workspaceRoot });
            c(res.toString());
        });
    }


    private toTreeFile(res: string) {
        const list = res.split('\n');
        return list.filter(i => i.trim() !== '').map((item) => {
            const status = item[0];
            const fullPathName = item.replace(/\s+/, '$').split('$')[1];
            const fileName = path.basename(fullPathName);
            return new BianGengDan(fileName, status, fullPathName, vscode.TreeItemCollapsibleState.None);
        });
    }
}


