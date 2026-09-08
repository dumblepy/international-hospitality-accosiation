import { audiences } from '../data/content'

export function Audience() {
	return <section class="audience section" id="audience" aria-labelledby="audience-title"><div class="audience-image-wrap"><img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1800&q=85" alt="地域の魅力を伝えるホテルのロビーと自然光" width="1800" height="1200" loading="lazy" /></div><div class="audience-panel"><p class="eyebrow">FOR YOU</p><h2 id="audience-title">こんな方に<br />おすすめです。</h2><ul>{audiences.map((audience) => <li>{audience}<span aria-hidden="true">→</span></li>)}</ul></div></section>
}
