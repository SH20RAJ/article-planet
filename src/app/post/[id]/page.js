export default function Page({ params }) {
  console.log(params.slug)
  return <div>My Post: {params.slug}</div>
}
