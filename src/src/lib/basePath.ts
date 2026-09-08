const rawBaseUrl = import.meta.env.BASE_URL || '/'

const basePathPrefix = rawBaseUrl === '/'
	? ''
	: rawBaseUrl.endsWith('/')
		? rawBaseUrl.slice(0, -1)
		: rawBaseUrl

const externalLinkPattern = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i

export function withBasePath(path: string) {
	if (!path || path.startsWith('#') || externalLinkPattern.test(path)) return path
	const normalizedPath = path.startsWith('/') ? path : `/${path}`
	return basePathPrefix ? `${basePathPrefix}${normalizedPath}` : normalizedPath
}

export function stripBasePath(path: string) {
	if (!basePathPrefix) return path || '/'
	if (path === basePathPrefix || path === `${basePathPrefix}/`) return '/'
	if (path.startsWith(`${basePathPrefix}/`)) return path.slice(basePathPrefix.length) || '/'
	return path || '/'
}
