import { useSearchParams } from "next/navigation";

export async function GET(request: Request) {
  const searchParams = useSearchParams()
 
  const search = searchParams.get('id')
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${search}`);
  const post = await response.json();
  return new Response(JSON.stringify(request));
}
