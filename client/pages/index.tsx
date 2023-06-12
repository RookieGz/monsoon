import { GetServerSideProps } from "next";
import request from "utils/request";

interface Props {
  text: string;
}

function Index({ text }: Props) {
  return (
    <>
      This is Index page.
      {text}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async function ({
  req: { headers },
}) {
  const [{ data }] = await Promise.all([request("/hello", { headers })]);

  return {
    props: {
      text: data.message,
    },
  };
};

export default Index;
