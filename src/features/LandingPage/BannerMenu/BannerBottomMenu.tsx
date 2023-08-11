import { RiOilLine, RiToolsLine } from 'react-icons/ri';
import { GiCartwheel, GiLoveHowl, GiSchoolBag, GiSmartphone, GiStickGrenade } from 'react-icons/gi';
import { Button, Card, Col, Row } from 'antd';
import { FaGripHorizontal } from 'react-icons/fa';
import { AiOutlineCamera, AiOutlinePhone } from 'react-icons/ai';

export default function BannerBottomMenu() {
	const bannerBottomMenuCategories = [
		{
			key: 1,
			categoryName: 'Engine Oil',
			categoryIcon: RiOilLine,
		},
		{
			key: 2,
			categoryName: 'Spare Parts',
			categoryIcon: RiToolsLine,
		},
		{
			key: 3,
			categoryName: 'Bike Care',
			categoryIcon: GiLoveHowl,
		},
		{
			key: 4,
			categoryName: 'Bag Pack',
			categoryIcon: GiSchoolBag,
		},
		{
			key: 5,
			categoryName: 'Bumper',
			categoryIcon: GiStickGrenade,
		},
		{
			key: 6,
			categoryName: 'Mobile Holder',
			categoryIcon: GiSmartphone,
		},
		{
			key: 7,
			categoryName: 'Tire Gel',
			categoryIcon: GiCartwheel,
		},
		{
			key: 8,
			categoryName: 'Grip',
			categoryIcon: FaGripHorizontal,
		},
		{
			key: 9,
			categoryName: 'Camera',
			categoryIcon: AiOutlineCamera,
		},
		{
			key: 10,
			categoryName: 'Communicator',
			categoryIcon: AiOutlinePhone,
		},
	];
	return (
		<Row gutter={[16, 16]} className="mt-3">
			{bannerBottomMenuCategories?.map((item) => (
				<Col xs={24} sm={24} md={4} key={Math.random()}>
					<Card
						hoverable
						className="p-0 text-center"
						bodyStyle={{
							padding: '0px',
						}}
					>
						<Button
							block
							style={{
								fontSize: 14,
								textAlign: 'center',
							}}
							type="link"
							size="large"
						>
							{item?.categoryName}
						</Button>
					</Card>
				</Col>
			))}
		</Row>
	);
}
