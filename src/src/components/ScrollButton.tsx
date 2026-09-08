import type { ComponentChildren } from 'preact'

type ScrollButtonProps = {
	target: string
	className?: string
	label?: string
	children: ComponentChildren
}

export function ScrollButton({ target, className, label, children }: ScrollButtonProps) {
	function scrollToSection() {
		document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return <button type="button" class={className} aria-label={label} onClick={scrollToSection}>{children}</button>
}
