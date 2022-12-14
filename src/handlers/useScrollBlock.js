const safeDocument = typeof document !== 'undefined' ? document : {};

let scrollBlocked = false;
const html = safeDocument.documentElement;
const { body } = safeDocument;

const blockScroll = () => {
	if (!body || !body.style || scrollBlocked) return;

	const scrollBarWidth = window.innerWidth - html.clientWidth;
	const bodyPaddingRight =
		parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) ||
		0;

	html.style.position = 'relative'; /* [1] */
	html.style.overflow = 'hidden'; /* [2] */
	body.style.position = 'relative'; /* [1] */
	body.style.overflow = 'hidden'; /* [2] */
	body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

	scrollBlocked = true;
};

const allowScroll = () => {
	if (!body || !body.style || !scrollBlocked) return;

	html.style.position = '';
	html.style.overflow = '';
	body.style.position = '';
	body.style.overflow = '';
	body.style.paddingRight = '';

	scrollBlocked = false;
};

export { blockScroll, allowScroll };
