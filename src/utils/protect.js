export function decodeKey(encoded) {
	try {
		return atob(encoded)
	} catch {
		return ''
	}
}

export function disableDevtools() {
	if (process.client && process.env.NODE_ENV === 'production') {
		window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = undefined
	}
}

export function preventDebugAccess() {
	if (process.client && process.env.NODE_ENV === 'production') {
		window.addEventListener('keydown', (e) => {
			if (
				e.key === 'F12' ||
				(e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
				(e.ctrlKey && e.key === 'u')
			) {
				e.preventDefault()
			}
		})
		let threshold = 160
		setInterval(() => {
			if (window.outerHeight - window.innerHeight > threshold) {
				window.close()
			}
		}, 1000)
	}
}

export function blockConsole() {
	if (process.client && process.env.NODE_ENV === 'production') {
		console.log = () => {}
		console.warn = () => {}
		console.error = () => {}
		console.debug = () => {}
	}
}
