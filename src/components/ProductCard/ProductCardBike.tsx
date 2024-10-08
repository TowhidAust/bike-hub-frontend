import { Button, Card, Col, Row, Typography } from 'antd';
import { BlackButtonContainer } from '@/styles/styled/BlackButtonContainer';

type ProductPropTypes = {
	productInfo: {
		image: string;
		title: string;
		price: string;
		isUsed: boolean;
		model: string;
		cc: number;
		km: string;
		isFirstOwner: boolean;
		location: string;
		isNegotiable: boolean;
	};
	onDetailsButtonClick: () => void;
};
export default function ProductCardBike(props: ProductPropTypes) {
	const { onDetailsButtonClick, productInfo } = props;
	const { image, title, price, isUsed, model, cc, km, isFirstOwner, location, isNegotiable } = productInfo;
	return (
		<Card
			// key={key}
			cover={
				<div
					className="app-border-radius-product-card-image"
					style={{
						position: 'relative',
						textAlign: 'right',
						backgroundImage: `url(${image})`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						height: '200px',
					}}
				>
					<BlackButtonContainer>
						<Button
							style={{ borderRadius: '5px 0 0 0', position: 'absolute', bottom: 0, right: 0 }}
							type="primary"
							onClick={onDetailsButtonClick}
						>
							DETAILS
						</Button>
					</BlackButtonContainer>
				</div>
			}
		>
			<Row gutter={[8, 8]}>
				<Col xs={24} sm={24} md={24}>
					<Typography.Title
						level={5}
						style={{
							whiteSpace: 'nowrap',
							width: '90%',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						<abbr style={{ textDecoration: 'none' }} title={title}>
							{title}
						</abbr>
					</Typography.Title>
				</Col>
				<Col xs={24} sm={24} md={12}>
					<Typography.Text className="font-weight-600 primary-font-color">BDT {price}</Typography.Text>
				</Col>
				<Col xs={24} sm={24} md={12}>
					Condition: {isUsed ? 'Used' : 'New'}
				</Col>
				<Col xs={24} sm={24} md={12}>
					Model: {model}
				</Col>
				<Col xs={24} sm={24} md={12}>
					CC: {cc}
				</Col>
				<Col xs={24} sm={24} md={12}>
					Km: {km}
				</Col>
				<Col xs={24} sm={24} md={12}>
					Owner: {isFirstOwner}
				</Col>
				<Col xs={24} sm={24} md={12}>
					{location}
				</Col>
				<Col xs={24} sm={24} md={12}>
					{isNegotiable ? 'Negotiable' : 'Fixed Price'}
				</Col>
			</Row>
		</Card>
	);
}
