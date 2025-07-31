import { Img, Section } from '@react-email/components';

import { environment } from '@workspace/shared/env';

type LogoProps = { className?: string };
const Logo = (props: LogoProps) => (
	<Section className={`mb-3 flex ${props.className}`}>
		<Img
			src={`${environment.URL}/brand/logo.svg`}
			alt={environment.BRAND_NAME}
			width="147"
			height="24"
			className="my-0"
		/>
	</Section>
);

Logo.displayName = 'Logo';
export default Logo;
