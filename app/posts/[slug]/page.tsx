"use server";

export function Pages({ post }: any) {
  console.log("3", post);
  return <div>EachPost {JSON.stringify(post)}</div>;
}

export async function getServerSideProps(context:any) {

  const response = await fetch(`http://localhost:3000/api/post?id=${context.params.slug}`);
  const post = await response.json();


  console.log("2", post);

  return { props: { post } };
}
