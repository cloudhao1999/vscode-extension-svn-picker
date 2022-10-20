import * as vscode from 'vscode';
import { BianGengDanAddProvider } from './core/subtree';
import { BianGengDanProvider } from './core/tree';
import { getRootPath } from './util/config';



export function activate(context: vscode.ExtensionContext) {

	const rootPath = getRootPath();

	const bianGengDanProvider = new BianGengDanProvider(rootPath!);
	const bianGengDanAddProvider = new BianGengDanAddProvider([]);
	const bianGengDanModifyProvider = new BianGengDanAddProvider([]);
	const bianGengDanDeleteProvider = new BianGengDanAddProvider([]);

	vscode.window.registerTreeDataProvider(
		'biangengdan',
		bianGengDanProvider
	);

	vscode.window.registerTreeDataProvider(
		'biangengdanAdd',
		bianGengDanAddProvider
	);

	vscode.window.registerTreeDataProvider(
		'biangengdanModify',
		bianGengDanModifyProvider
	);

	vscode.window.registerTreeDataProvider(
		'biangengdanDelete',
		bianGengDanDeleteProvider
	);



	context.subscriptions.push(
		vscode.commands.registerCommand('biangengdan.refreshEntry', () =>
			bianGengDanProvider.refresh()
		),
		vscode.commands.registerCommand('biangengdan.exportEntry', () => {
			const options: vscode.OpenDialogOptions = {
				canSelectMany: false,
				canSelectFolders: true,
				canSelectFiles: false,
				openLabel: 'Open',
			};

			vscode.window.showOpenDialog(options).then(fileUri => {
				if (fileUri && fileUri[0]) {
					console.log('Selected file: ' + fileUri[0].fsPath);
					const toUri = fileUri[0].fsPath + '/';
					bianGengDanAddProvider.export(toUri);
					bianGengDanModifyProvider.export(toUri);
				}
			});

		}
		),
		vscode.commands.registerCommand('biangengdan.clearAddEntry', () => {
			bianGengDanAddProvider.clear();
			bianGengDanAddProvider.refresh();
		}
		),
		vscode.commands.registerCommand('biangengdan.clearModifyEntry', () => {
			bianGengDanModifyProvider.clear();
			bianGengDanModifyProvider.refresh();
		}
		),
		vscode.commands.registerCommand('biangengdan.clearDeleteEntry', () => {
			bianGengDanDeleteProvider.clear();
			bianGengDanDeleteProvider.refresh();
		}
		),
		vscode.commands.registerCommand('biangengdan.copyAddEntry', () =>
			bianGengDanAddProvider.copy()

		),
		vscode.commands.registerCommand('biangengdan.copyModifyEntry', () =>
			bianGengDanModifyProvider.copy()
		),
		vscode.commands.registerCommand('biangengdan.copyDeleteEntry', () =>
			bianGengDanDeleteProvider.copy()
		),
		vscode.commands.registerCommand('biangengdan.addEntry', (...args) => {
			console.log('addEntry arguments value', args[0]);
			const status = args[0].status;

			if (status === 'A') {
				bianGengDanAddProvider.add(args[0]);
				bianGengDanAddProvider.refresh();
			} else if (status === 'M') {
				bianGengDanModifyProvider.add(args[0]);
				bianGengDanModifyProvider.refresh();
			} else if (status === 'D') {
				bianGengDanDeleteProvider.add(args[0]);
				bianGengDanDeleteProvider.refresh();
			}
		}
		),
		vscode.commands.registerCommand('biangengdan.deleteEntry', (...args) => {
			const status = args[0].status;

			if (status === 'A') {
				bianGengDanAddProvider.delete(args[0]);
				bianGengDanAddProvider.refresh();
			} else if (status === 'M') {
				bianGengDanModifyProvider.delete(args[0]);
				bianGengDanModifyProvider.refresh();
			} else if (status === 'D') {
				bianGengDanDeleteProvider.delete(args[0]);
				bianGengDanDeleteProvider.refresh();
			}
		}
		),
	);
}

export function deactivate() {

}
