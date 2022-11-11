import React from 'react';
import List from './List';
import { Button } from '../Button';
import NoSchemas from './NoSchemas';
import { PlayIcon } from '../../svg';

import styles from './styles/SchemasListPage.module.css';

export default function SchemasListPage({
	schemas,
	next,
	previous,
	no_schemas,
	decPage,
	incPage,
	page,
	count,
	update,
	updateList,
}) {
	return (
		<>
			{schemas.length > 0 && (
				<>
					<List
						schemas={schemas}
						update={update}
						updateList={updateList}
					></List>
					<div className={styles.pages_btns_container}>
						{page > 1 && (
							<Button isMain={true} text={previous} action={decPage}>
								<PlayIcon className={styles.prev_icon} />
							</Button>
						)}
						{page < count / 5 && (
							<Button isMain={true} text={next} action={incPage}>
								<PlayIcon className={styles.next_icon} />
							</Button>
						)}
					</div>
				</>
			)}
			{schemas.length === 0 && <NoSchemas no_schemas={no_schemas} />}
		</>
	);
}
