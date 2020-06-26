import React from "react";
import Head from "next/head";
import { withAuth } from "../utils/withAuth";
import AddStoryComponent from "../modules/add-story";

function AddStory() {
  return (
    <>
      <Head>
        <title>Archimydes | Add Story</title>
      </Head>
      <AddStoryComponent />
    </>
  );
}
export default withAuth(AddStory);
