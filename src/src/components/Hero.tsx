import { withBasePath } from '../lib/basePath'
import { ScrollButton } from './ScrollButton'

export function Hero() {
	return <section class="hero" id="top" aria-labelledby="hero-title"><img class="hero-image" src={withBasePath('/images/hero-welcome.png')} alt="日本人のホテルスタッフが、アラブ人ムスリムの旅行者夫婦をホテルの入口で迎える様子" width="2016" height="800" fetchpriority="high" /><div class="hero-shade" /><div class="hero-content page-gutter"><p class="preparing">設立準備中</p><h1 id="hero-title">多文化を理解し、<br />世界中のお客様を<br />笑顔で迎える。</h1><ScrollButton target="about" className="text-link light-link">私たちについて <span aria-hidden="true">↓</span></ScrollButton></div><p class="hero-caption">Hospitality begins with understanding.</p></section>
}
