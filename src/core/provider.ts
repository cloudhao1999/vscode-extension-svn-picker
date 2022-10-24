import { getRootPath } from "../util/config";
import { CountDecorationProvider } from "./decoration";
import { BianGengDanSubtreeProvider } from "./subtree";
import { BianGengDanProvider } from "./tree";

const rootPath = getRootPath();

// 数据源
const bianGengDanProvider = new BianGengDanProvider(rootPath!);
const bianGengDanAddProvider = new BianGengDanSubtreeProvider([]);
const bianGengDanModifyProvider = new BianGengDanSubtreeProvider([]);
const bianGengDanDeleteProvider = new BianGengDanSubtreeProvider([]);
const countDecorationProvider = new CountDecorationProvider(bianGengDanProvider);

export default {
	bianGengDanProvider,
	bianGengDanAddProvider,
	bianGengDanModifyProvider,
	bianGengDanDeleteProvider,
	countDecorationProvider,
};