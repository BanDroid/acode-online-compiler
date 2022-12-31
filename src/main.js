import plugin from "../plugin.json";

const CONSTANT = {
	api_url: "https://api.codex.jaagrav.in",
};

class AcodeBasicOnlineCompiler {
	async init() {}

	async destroy() {}
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
