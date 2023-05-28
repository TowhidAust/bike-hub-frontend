import { Affix, Button, Col, Layout, Menu, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { PUBLIC_ROUTE } from '@/router/appRoutes';
import { RootState } from '@/redux/store';
import { setCurrentActiveMenu } from '@/redux/activeMenubarSlice';
import Logo from '../Logo/Logo';

const { Header } = Layout;

export default function TopBar() {
	const { activeMenu, auth } = useSelector((state: RootState) => state);
	const { user } = auth;
	const { firstname } = user;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<Affix offsetTop={0} className="width-100">
			<div>
				<Header className="pl-4 pr-4" style={{ backgroundColor: 'black', width: '100%', height: 'auto' }}>
					<Row gutter={[16, 16]} align="middle" justify="space-between">
						<Col xs={24} md={6}>
							<Logo fontColor="white" width={120} fontSize={18} iconFontSize={26} />
							{/* <h2
								className="font-white m-0"
								style={{
									display: 'flex',
									justifyContent: 'flex-start',
									alignItems: 'center',
								}}
							>
								<span> BIKE </span>
								<FaMotorcycle className="ml-2 mr-2 primary-font-color" style={{ fontSize: '26px' }} />
								<span> HUB </span>
							</h2> */}
						</Col>
						<Col xs={24} md={6} className="text-right">
							{!firstname ? (
								<Button
									type="link"
									icon={<UserOutlined />}
									onClick={() => {
										navigate(PUBLIC_ROUTE.SIGNUP);
									}}
								>
									Login
								</Button>
							) : (
								<Button type="link" icon={<UserOutlined />}>
									{firstname}
								</Button>
							)}
						</Col>
					</Row>
				</Header>
				<Menu
					theme="light"
					mode="horizontal"
					defaultSelectedKeys={[activeMenu.currentActiveMenu]}
					items={[
						{
							key: 'home',
							label: 'Home',
							onClick: () => {
								dispatch(setCurrentActiveMenu('home'));
								navigate(PUBLIC_ROUTE.LANDING);
							},
						},
						{
							key: 'sellBike',
							label: 'Sell Bike',
							onClick: () => {
								dispatch(setCurrentActiveMenu('sellBike'));
								navigate(PUBLIC_ROUTE.SELL_BIKE_PAGE);
							},
						},
						{
							key: 'buyUsedBike',
							label: 'Buy Used Bike',
							onClick: () => {
								dispatch(setCurrentActiveMenu('buyUsedBike'));
								navigate(PUBLIC_ROUTE.USED_BIKES);
							},
						},
						{
							key: 'bikeService',
							label: 'Bike Service',
							onClick: () => {
								navigate(PUBLIC_ROUTE.SIGNUP);
								dispatch(setCurrentActiveMenu('bikeService'));
							},
						},
					]}
				/>
			</div>
		</Affix>
	);
}
