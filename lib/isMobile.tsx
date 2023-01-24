import { GetServerSidePropsContext, PreviewData } from "next/types";
import { ParsedUrlQuery } from "querystring";

export default function isMobile(
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) : boolean {
  const uaString = context.req.headers["user-agent"];
  let isMobile = false;

  if (uaString?.match(/android/i) || uaString?.match(/iphone/i)) {
    isMobile = true;
  }
  return isMobile;
}
