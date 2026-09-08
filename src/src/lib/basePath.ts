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
