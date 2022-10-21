import * as vscode from "vscode";
import { addEntry, deleteEntry, exportEntryFn } from "./core/entry";
import provider from "./core/provider";

const {
	bianGengDanProvider,
	bianGengDanAddProvider,
	bianGengDanModifyProvider,
	bianGengDanDeleteProvider,
} = provider;

const config = [
	{ provider: bianGengDanProvider, view: "biangengdan" },
	{ provider: bianGengDanAddProvider, view: "biangengdanAdd" },
	{ provider: bianGengDanModifyProvider, view: "biangengdanModify" },
	{ provider: bianGengDanDeleteProvider, view: "biangengdanDelete" },
];

const emits = [
	{ event: vscode.workspace.onDidSaveTextDocument, fn: bianGengDanProvider.refresh.bind(bianGengDanProvider) },
	{ event: vscode.workspace.onDidCreateFiles, fn: bianGengDanProvider.refresh.bind(bianGengDanProvider) },
	{ event: vscode.workspace.onDidDeleteFiles, fn: bianGengDanProvider.refresh.bind(bianGengDanProvider) },
];

const commands = [
	{ command: "biangengdan.refreshEntry", callback: [bianGengDanProvider.refresh.bind(bianGengDanProvider)], },
	{ command: "biangengdan.clearAddEntry", callback: [bianGengDanAddProvider.clear.bind(bianGengDanAddProvider), bianGengDanAddProvider.refresh.bind(bianGengDanAddProvider)], },
	{ command: "biangengdan.clearModifyEntry", callback: [bianGengDanModifyProvider.clear.bind(bianGengDanModifyProvider), bianGengDanModifyProvider.refresh.bind(bianGengDanModifyProvider),], },
	{ command: "biangengdan.clearDeleteEntry", callback: [bianGengDanDeleteProvider.clear.bind(bianGengDanDeleteProvider), bianGengDanDeleteProvider.refresh.bind(bianGengDanDeleteProvider),], },
	{ command: "biangengdan.copyAddEntry", callback: [bianGengDanAddProvider.copy.bind(bianGengDanAddProvider)], },
	{ command: "biangengdan.copyModifyEntry", callback: [bianGengDanModifyProvider.copy.bind(bianGengDanModifyProvider)], },
	{ command: "biangengdan.copyDeleteEntry", callback: [bianGengDanDeleteProvider.copy.bind(bianGengDanDeleteProvider)], },
	{ command: "biangengdan.exportEntry", callback: [exportEntryFn] },
	{ command: "biangengdan.addEntry", callback: [addEntry] },
	{ command: "biangengdan.deleteEntry", callback: [deleteEntry] },
];

export function activate(context: vscode.ExtensionContext) {

	config.forEach((item) => {
		vscode.window.createTreeView(item.view, {
			treeDataProvider: item.provider,
		});
	});

	context.subscriptions.push(
		...emits.map((item) => {
			return item.event(item.fn);
		}),
		...commands.map((item) => {
			return vscode.commands.registerCommand(item.command, (...args) => {
				item.callback.forEach((fn: (args: any[]) => void) => {
					fn(args);
				});
			});
		})
	);
}

export function deactivate() { }
