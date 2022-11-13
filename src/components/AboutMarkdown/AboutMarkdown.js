import React, { useState } from 'react';
import { Remarkable } from 'remarkable';
import { sanitize } from 'dompurify';
import aboutTextUkr from '../../docs/aboutTextUkr.md';
import aboutTextEng from '../../docs/aboutTextEng.md';

import styles from './styles/AboutMarkdown.module.css';

export default function AboutMarkdown({ lang }) {
	let [mdText, setMdText] = useState('');
	let currAboutText = lang === 'ukr' ? aboutTextUkr : aboutTextEng;
	fetch(currAboutText)
		.then((res) => res.text())
		.then((text) => {
			setMdText(text);
		});
	let md = new Remarkable({ html: true });

	return (
		<>
			<div className={styles.markdown_container}>
				<div
					dangerouslySetInnerHTML={{
						__html: sanitize(md.render(mdText)),
					}}
				/>
				{/* <ReactMarkdown>{mdText}</ReactMarkdown> */}
			</div>
		</>
	);
}
