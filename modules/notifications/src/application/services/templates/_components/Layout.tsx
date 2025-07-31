import type { ReactNode } from 'react';
import { Body, Font, Head, Html, Tailwind } from '@react-email/components';

import Container from './Container';
import Footer from './Footer';
import Logo from './Logo';
import Title from './Title';

const base = {
	fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};

type LayoutProps = { title: string; children: ReactNode };
const Layout = (props: LayoutProps) => (
	<Html lang="pt-BR">
		<Head>
			<title>{props.title}</title>
			<Font
				fontFamily="Roboto"
				fallbackFontFamily="Verdana"
				webFont={{
					url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
					format: 'woff2',
				}}
				fontWeight={400}
				fontStyle="normal"
			/>
		</Head>
		<Tailwind>
			<Body className="mx-auto my-auto" style={base}>
				<Container>
					<Logo className="mb-3 flex" />
					<Title>{props.title}</Title>

					{props.children}

					<Footer />
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default Layout;
