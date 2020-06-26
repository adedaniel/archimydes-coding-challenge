import { withAuth } from "../utils/withAuth";
import Dashboard from "../modules/home";
import Head from "next/head";
const Index = () => (
  <>
    <Head>
      <title>Archimydes | Home</title>
    </Head>
    <Dashboard />
  </>
);

export default withAuth(Index);
