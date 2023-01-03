const CONSTANT = Object.freeze({
	api_url: "https://api.codex.jaagrav.in",
});

async function compileWorker(config) {
	try {
		const res = await fetch(CONSTANT.api_url, config);
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error(error);
	}
}

self.onmessage = (e) => {
	compileWorker(e.data)
		.then((data) => {
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
};
