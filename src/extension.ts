import * as vscode from "vscode";
import * as _ from "lodash";
import { BianGengDanDecorationProvider } from "./core/decoration";
import { addEntry, deleteEntry, exportEntryFn } from "./core/entry";
import { openFile } from "./core/file";
import provider, { refreshTitle, treeViewProvider } from "./core/provider";

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

const decoration = [new BianGengDanDecorationProvider(bianGengDanProvider)];

const refreshDebounce = _.debounce(bianGengDanProvider.refresh.bind(bianGengDanProvider), 1500);

const emits = [
	{ event: vscode.workspace.onDidSaveTextDocument, fn: refreshDebounce },
	{ event: vscode.workspace.onDidCreateFiles, fn: refreshDebounce },
	{ event: vscode.workspace.onDidDeleteFiles, fn: refreshDebounce },
	{ event: vscode.workspace.onDidChangeTextDocument, fn: refreshDebounce },
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
	{ command: "biangengdan.openFile", callback: [openFile] },
];

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		...config.map((item) => {
			treeViewProvider[item.view] = vscode.window.createTreeView(item.view, {
				treeDataProvider: item.provider,
			});
			return treeViewProvider[item.view];
		}),
		...decoration,
		...emits.map((item) => {
			return item.event(item.fn);
		}),
		...commands.map((item) => {
			return vscode.commands.registerCommand(item.command, (...args) => {
				item.callback.forEach((fn: (args: any[]) => void) => {
					fn(args);
				});
			});
		}),
	);

	refreshTitle();
}

export function deactivate() { }
