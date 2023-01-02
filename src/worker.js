const qs = require("qs");

const CONSTANT = Object.freeze({
	api_url: "https://api.codex.jaagrav.in",
});

async function compileWorker(config) {
	try {
		const res = await fetch(api_url, config);
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error(error);
	}
}

self.addEventListener("message", ({ data: config }) => {
	compileWorker(config)
		.then((res) => {
			if (data.error) {
				self.postMessage({
					action: "compile_failed",
					payload: data,
				});
			} else {
				self.postMessage({
					action: "compile_success",
					payload: data,
				});
			}
		})
		.catch((error) => {
			self.postMessage({
				action: "request_failed",
				payload: {
					error: error.message,
				},
			});
		});
});
