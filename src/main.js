import plugin from "../plugin.json";

const axios = require("axios");
const qs = require("qs");

const CONSTANT = Object.freeze({
	api_url: "https://api.codex.jaagrav.in",
});

class AcodeBasicOnlineCompiler {
	constructor() {
		this.command = {
			name: "CodeX compiler",
			description: "CodeX compiler",
			exec: this.compile.bind(this),
		};
		this.config = {
			method: "post",
			url: CONSTANT.api_url,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: "",
		};
	}

	async init() {
		editorManager.editor.commands.addCommand(this.command);
	}

	async compile() {}

	async destroy() {
		editorManager.editor.commands.removeCommand(this.command);
	}
}

if (window.acode) {
	const acodePlugin = new AcodeBasicOnlineCompiler();
	acode.setPluginInit(
		plugin.id,
		(baseUrl, $page, { cacheFileUrl, cacheFile }) => {
			if (!baseUrl.endsWith("/")) {
				baseUrl += "/";
			}
			acodePlugin.baseUrl = baseUrl;
			acodePlugin.init($page, cacheFile, cacheFileUrl);
		}
	);
	acode.setPluginUnmount(plugin.id, () => {
		acodePlugin.destroy();
	});
}
