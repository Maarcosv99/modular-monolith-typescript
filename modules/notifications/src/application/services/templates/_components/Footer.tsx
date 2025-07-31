import { Section, Text } from '@react-email/components';

import { environment } from '@workspace/shared/env';

type FooterProps = { className?: string };
const Footer = (props: FooterProps) => (
	<Section className={props.className}>
		<Text className="w-[80%] text-xs text-[#838383]">
			© {environment.BRAND_NAME}, Todos os Direitos Reservados. Aracaju, Sergipe,
			Brasil.
		</Text>
	</Section>
);

export default Footer;
