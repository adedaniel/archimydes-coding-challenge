import React from "react";
import { withAuth } from "../../utils/withAuth";
import Head from "next/head";
import StoryDetailComponent from "../../modules/story-detail";
function StoryDetail() {
  return (
    <>
      <Head>
        <title>Archimydes | Story</title>
      </Head>
      <StoryDetailComponent />
    </>
  );
}

export default withAuth(StoryDetail);
