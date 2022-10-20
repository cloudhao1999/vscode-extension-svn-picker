import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";
import BianGengDan from ".";
import { getConfiguration, getRootPath } from "../util/config";

export class BianGengDanAddProvider implements vscode.TreeDataProvider<BianGengDan> {
    constructor(private itemList?: BianGengDan[]) { }

    getTreeItem(element: BianGengDan): vscode.TreeItem {
        return element;
    }

    getChildren(): Thenable<BianGengDan[]> {
        return new Promise<BianGengDan[]>((resolve, reject) => {
            return resolve(this.itemList ?? []);
        });
    }

    add(item?: BianGengDan) {
        this.itemList?.push(item!);
    }

    clear() {
        this.itemList = [];
    }

    copy() {
        const textArr = this.itemList!.map(x => `${path.resolve(getConfiguration('prefixPath'), x.fullPathName)}`.replace(/\\\\/g, "/").replace(/\\r/g, ""));
        vscode.env.clipboard.writeText(textArr.join("\r\n"));
    }

    delete(item?: BianGengDan) {
        this.itemList?.splice(this.itemList.indexOf(item!), 1);
    }

    export(toUri: string) {
        this.itemList?.forEach((item) => {
            const dest = path.join(toUri,'new',`${getConfiguration('prefixPath')}${item.fullPathName}`);
            let from = path.join(getRootPath(),'./', item.fullPathName);
            if (fs.existsSync(from)) {
              fs.cp(from, dest, { recursive: true }, (err: any) => {});
            }
            console.log('*********from*********', from);
            console.log('*********dest*********', dest);
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

}
