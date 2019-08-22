import React from 'react';
// import { Logout } from '../../components/Logout';
// import { UserBadge } from '../../components/UserBadge';
import './index.scss';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import definitions from '../../routes/definitions';
import Router from 'next/router';
import getConfig from 'next/config';

import { useRouter } from 'next/router';

const { publicRuntimeConfig: { STATIC_DIR } } = getConfig();
const { Content, Footer, Sider } = Layout;
const menu = definitions;



const view = (props) => {
	const router = useRouter();
	let currentPath = menu.filter((element) => element.path === router.pathname);
	return (
		<Layout style={{ height: '100vh' }}>
			<Sider
				collapsed={true}
				breakpoint="sm"
				// collapsedWidth={"0"}
				// onBreakpoint={(broken) => {
				// 	console.log(broken);
				// }}
				// onCollapse={(collapsed, type) => {
				// 	console.log(collapsed, type);
				// }}
			>
				<img className="logo noselect" src={`${STATIC_DIR}/img/logo.svg`} alt="Logo" />

				{/* <-----------------------MENU-----------------------> */}
				<Menu
					theme="dark"
					mode="inline"
					// defaultSelectedKeys={[ String(currentPath) ]}
					selectedKeys={[String(currentPath[0].key)]}
				>
					{menu.map(({ iconType, key, title, path }) => (
						<Menu.Item key={key} onClick={() => Router.push(path)} title={title}>
							<Icon type={iconType} />
						</Menu.Item>
					))}
				</Menu>
				{/* <UserBadge /> */}
			</Sider>
			<Layout>
				{/* <-----------------------HEADER-----------------------> */}
				{/* <Header style={{ background: '#fff', padding: 10 }} /> */}
				<Content style={{ margin: '24px 16px 0' }}>
					<div style={{ padding: 24, background: '#fff', minHeight: '60vh', maxHeight: '90vh' }}>
						<Breadcrumb>
							<Breadcrumb.Item href="">
								<Icon type="home" />
							</Breadcrumb.Item>
							<Breadcrumb.Item href="">
								<span>{currentPath[0].breadcrumbName}</span>
							</Breadcrumb.Item>
						</Breadcrumb>
						{props.props.children}
					</div>
				</Content>
				{/* <-----------------------FOOTER-----------------------> */}
				<Footer className="noselect" style={{ textAlign: 'center' }}>
					<img className="logo--small" src={`${STATIC_DIR}/img/logo.svg`} alt="Logo" /> Codesq ©2019
				</Footer>
			</Layout>
		</Layout>
	);
};

export default view;
