import { getRootPath } from "../util/config";
import { BianGengDanSubtreeProvider } from "./subtree";
import { BianGengDanProvider } from "./tree";

const rootPath = getRootPath();

// 数据源
const bianGengDanProvider = new BianGengDanProvider(rootPath!);
const bianGengDanAddProvider = new BianGengDanSubtreeProvider([]);
const bianGengDanModifyProvider = new BianGengDanSubtreeProvider([]);
const bianGengDanDeleteProvider = new BianGengDanSubtreeProvider([]);

export default {
	bianGengDanProvider,
	bianGengDanAddProvider,
	bianGengDanModifyProvider,
	bianGengDanDeleteProvider,
};