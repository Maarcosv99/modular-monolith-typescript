import { Button, Section, Text } from '@react-email/components';

import { environment } from '@workspace/shared/env';

import Layout from './_components/Layout';

export interface WelcomeMailProps {
  brand:string;
}

export default function WelcomeMail(props: WelcomeMailProps) {
	return (
		<Layout title={`Seja bem-vindo(a) a ${environment.BRAND_NAME}`}>
			<Section>
				<Text className="text-base">
					Estamos muito felizes por você ter dado este primeiro passo para fazer o
					seu negócio crescer cada vez mais.
				</Text>
				<Text className="text-base">
					Para começar, clique no botão abaixo para acessar a plataforma e explorar
					todas as funcionalidades incríveis que oferecemos.
				</Text>
				<Button
					className="rounded bg-[#a4ff64] px-[40px] py-[12px] text-center text-sm font-bold text-black"
					href={`${environment.URL}/`}
				>
					Acessar minha conta
				</Button>
				<Text className="text-base">
					Estamos ansiosos para ver o que você vai conquistar!.
				</Text>
			</Section>
		</Layout>
	);
}
