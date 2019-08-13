import React from 'react';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

import './index.css';

export default () => (
	<div className="spinner">
		<Spin indicator={antIcon} />
	</div>
);
