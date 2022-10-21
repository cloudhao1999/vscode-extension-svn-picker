import { getRootPath } from "../util/config";
import { BianGengDanSubtreeProvider } from "./subtree";
import { BianGengDanProvider } from "./tree";

const rootPath = getRootPath();

// 数据源
const provider = {
     bianGengDanProvider : new BianGengDanProvider(rootPath!),
	 bianGengDanAddProvider : new BianGengDanSubtreeProvider([]),
	 bianGengDanModifyProvider : new BianGengDanSubtreeProvider([]),
	 bianGengDanDeleteProvider : new BianGengDanSubtreeProvider([]),
};

export default provider;