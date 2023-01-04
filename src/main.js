import plugin from "../plugin.json";
import tag from "html-tag-js";
import style from "./style.scss";
const qs = require("qs");

const CONSTANT = Object.freeze({
	api_url: "https://api.codex.jaagrav.in",
	languages: ["java", "py", "cpp", "c", "go", "cs", "js"],
});

class AcodeBasicOnlineCompiler {
	#worker = null;

	constructor() {
		this.command = {
			name: "CodeX compiler",
			description: "CodeX compiler",
			exec: this.compile.bind(this),
		};
	}

	async init($page) {
		editorManager.editor.commands.addCommand(this.command);
		$page.id = "acode-online-compiler";
		this.$page = $page;
		this.$style = tag("style", {
			textContent: style,
		});
		this.outputArea = tag("pre", {
			className: "outputArea",
		});
		this.$page.append(this.outputArea);
		document.head.append(this.$style);
		this.$page.onhide = () => {
			this.outputArea.innerText = "";
		};
	}

	async userInput() {
		const options = { required: false };
		const input = await acode.prompt(
			"Input for your program",
			"",
			"textarea",
			options
		);
		return input && input !== null && input !== undefined
			? String(input)
			: "";
	}

	async compile() {
		const fileExt = editorManager.activeFile.filename
			.match(/\.[0-9a-z]+$/i)[0]
			.replace(".", "");
		// check if file language type is supported
		if (!CONSTANT.languages.find((it) => it === fileExt)) {
			acode.alert(
				"Sorry!",
				"The file you want to compile is currently not supported. check the plugin details."
			);
			return;
		}

		const input = await this.userInput();

		this.loadingDialog = acode.loader("Please wait...", "compiling");
		this.loadingDialog.show();

		const data = qs.stringify({
			code: editorManager.editor.getValue() || "",
			language: fileExt,
			input: input, // .replaceAll("\n", "\\n"),
		});

		const config = {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: data,
		};
		this.runWorker(config);
	}

	runWorker(config) {
		if (this.#worker) this.#worker.terminate();
		this.#worker = new Worker(new URL("./compile.js", import.meta.url));
		this.#worker.onmessage = (e) => {
			let isError = false;
			const data = e.data;
			if (
				data.action === "compile_failed" ||
				data.action === "request_failed"
			) {
				isError = true;
			}
			this.showOutput(isError, data.payload);
		};
		this.#worker.postMessage(config);
	}

	showOutput(isError, outputObj) {
		this.loadingDialog.destroy();
		if (isError) {
			this.$page.settitle("Online Compiler(Error)");
			this.$page.show();
			this.outputArea.innerText = outputObj.error;
		} else {
			this.$page.settitle("Online Compiler(Success)");
			this.$page.show();
			this.outputArea.innerText = outputObj.output;
		}
		this.#worker.terminate();
		this.#worker = null;
	}

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
