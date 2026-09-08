import { services } from '../data/content'

export function Services() {
	return <section class="services section page-gutter" id="services" aria-labelledby="services-title"><div class="services-heading"><div class="section-label">02 — SERVICES</div><h2 id="services-title">文化の違いを、<br />歓迎の力に変える。</h2><p>学び、対話し、地域や現場へつなぐ。多様な形で、受け入れの力を育てます。</p></div><div class="service-list">{services.map((service) => <article class="service-item"><span class="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><span class="service-arrow" aria-hidden="true">↗</span></article>)}</div></section>
}
