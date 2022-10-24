import * as path from "path";
import * as vscode from "vscode";
import { FileDecorationProvider } from "vscode";
import { getRootPath } from "../util/config";
import { BianGengDanProvider } from "./tree";

export class BianGengDanDecorationProvider implements FileDecorationProvider {
	disposables: vscode.Disposable[];
	constructor(private provider: BianGengDanProvider) {
		this.disposables = [];
		this.disposables.push(vscode.window.registerFileDecorationProvider(this));
	}

	async provideFileDecoration(uri: vscode.Uri): Promise<vscode.FileDecoration | undefined> {
		const treeItem = await this.provider.getChildren();
		const status = treeItem.find((item) => {
			let from = path.join(getRootPath(),'./', item.fullPathName);
			return from.includes(uri.fsPath.replace(/\\/g, '\\'));
		})?.getStatus();
		if (status) {
			return {
				badge: status,
				tooltip: status,
				color: this.switchColor(status),
			};
		} else {
			return undefined;
		}
	}

	switchColor(status: string | undefined) {
		if (status === 'M') {
			return new vscode.ThemeColor("gitDecoration.modifiedResourceForeground");
		} else if (status === 'A') {
			return new vscode.ThemeColor("gitDecoration.addedResourceForeground");
		} else if (status === 'D') {
			return new vscode.ThemeColor("gitDecoration.deletedResourceForeground");
		}
	}


	dispose() {
		this.disposables.forEach((d) => d.dispose());
	}
}