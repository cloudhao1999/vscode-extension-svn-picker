import { nextTick } from "process";
import * as vscode from "vscode";
import { getRootPath } from "../util/config";
import { BianGengDanSubtreeProvider } from "./subtree";
import { BianGengDanProvider } from "./tree";

const rootPath = getRootPath();

// 数据源
const bianGengDanProvider = new BianGengDanProvider(rootPath!);
const bianGengDanAddProvider = new BianGengDanSubtreeProvider([]);
const bianGengDanModifyProvider = new BianGengDanSubtreeProvider([]);
const bianGengDanDeleteProvider = new BianGengDanSubtreeProvider([]);

export const treeViewProvider: {
	[key: string]: vscode.TreeView<any>;
} = {};

const treeViewConfig = [
	{ view: 'biangengdan', title: '项目变更'},
	{ view: 'biangengdanAdd', title: '新增变更'},
	{ view: 'biangengdanModify', title: '修改变更'},
	{ view: 'biangengdanDelete', title: '删除变更'},
];

export async function refreshTitle() {
	
	const treeViewPromiseArr = [
		bianGengDanProvider.getChildren(),
		bianGengDanAddProvider.getChildren(),
		bianGengDanModifyProvider.getChildren(),
		bianGengDanDeleteProvider.getChildren(),
	];

	Promise.all(treeViewPromiseArr).then((res) => {
		treeViewConfig.forEach((item, index) => {
			treeViewProvider[item.view].title = `${item.title}(${res[index].length})`;
		});
	});
}

export default {
	bianGengDanProvider,
	bianGengDanAddProvider,
	bianGengDanModifyProvider,
	bianGengDanDeleteProvider,
};